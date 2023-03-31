import { Declare, SingleData, Widget } from 'ptnl-constructor-sdk';
import { FilterMethod, Target } from 'ptnl-constructor-sdk/data';
// leaflet
import * as L from 'leaflet';
// enum
import { EBlockKey } from './enum';
// utils
import { getMode } from './utils/getMode';
// editor
import { initEditor } from './editor';
// templates
import { getMapTpl } from './settings/map/map.template';
import { getClusterTpl } from './settings/cluster/cluster.template';
import { getHeatTpl } from './settings/heat/heat.template';
import { getTooltipTpl } from './settings/tooltip/tooltip.template';
import { getDigitTpl } from './settings/digit/digit.template';
// types
import { SettingType } from './types';

@Declare({
  provideCssVariables: true,
})
export class MapUx extends Widget implements SingleData {
  readonly data!: SingleData['data'];
  readonly dataSettings!: SingleData['dataSettings'];
  //
  private _chart?: typeof L;
  private markers = [];
  //
  private settings: SettingType = {};

  getDataByPath(path: string): string[] {
    return this.data.map((item) => item[path]);
  }

  getUniqueDataByPath(path: string): string[] {
    return Array.from(new Set(this.getDataByPath(path)));
  }

  getDataConfig() {
    const settings = this.settings;
    //
    const { columnsByBlock } = this.dataSettings;
    //
    const xBlock = columnsByBlock[EBlockKey.X];
    const latBlock = columnsByBlock[EBlockKey.Lat];
    const lonBlock = columnsByBlock[EBlockKey.Lon];
    const valuesBlock = columnsByBlock[EBlockKey.Values];
    //
    const xPath = xBlock.length ? xBlock[0].path : null;
    const latPath = latBlock.length ? latBlock[0].path : null;
    const lonPath = lonBlock.length ? lonBlock[0].path : null;
    const valuesPaths = valuesBlock.length
      ? valuesBlock.map((item) => item.path)
      : [];
    //
    const toDigital = getDigitTpl(settings);
    //
    const dataset = this.data.map((item) => {
      return {
        x: item[xPath] || '',
        lat: Number(item[latPath]) || 0,
        lon: Number(item[lonPath]) || 0,
        values: valuesPaths.map((valPath, valIndex) => ({
          name: valuesBlock[valIndex].name,
          value: toDigital(item[valPath]),
        })),
      };
    });

    return {
      dataset,
    };
  }

  getChartOptions(): any {
    const settings = this.settings;
    //
    const dataConfig = this.getDataConfig();
    const { dataset } = dataConfig;

    getMapTpl(settings, dataset, this);
    // getTitleTpl(settings);
    getHeatTpl(settings, dataset, this);
    getClusterTpl(settings, dataset, this);
    getTooltipTpl(settings, dataset, this);
  }

  private onClick = (params) => {
    const { dataIndex, seriesIndex, name } = params;
    const { columnsByBlock } = this.dataSettings;
    const colKey = EBlockKey['X'];

    const filter = {
      column: columnsByBlock[colKey]?.[0],
      method: FilterMethod.Equal,
      value: name,
    };

    this.dataSettings.setFilter(filter, seriesIndex, Target.Other);
    this.dataSettings.interact(dataIndex);
  };

  private chartInit = () => {
    const server = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this._chart = L.map('view');

    L.tileLayer(server, {}).addTo(this._chart);

    this.getChartOptions();
  };

  private chart = () => {
    if (typeof this._chart === 'undefined') {
      this.chartInit();
    } else {
      this._chart.off();
      this._chart.remove();
      this._chart = undefined;
      this.markers = [];

      this.chartInit();
    }

    return this._chart;
  };

  onChange(): void {
    this.settings = { ...this.viewSettings };
    this.chart();

    this.ready();
  }

  onLangChange(): void {}

  onThemeChange(): void {}

  onInit(): void {
    if (getMode() === 'prod') initEditor(this);

    L.Icon.Default.imagePath = 'leaflet/images';

    this.dataSettings.events.onOtherFilterChange = (filter) => {
      console.log('onOtherFilterChange', filter);
    };
  }
}
