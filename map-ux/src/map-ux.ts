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
import { getTooltipTpl } from './settings/tooltip/tooltip.template';
// types
import { SettingType } from './types';
import { getHeatTpl } from './settings/heat/heat.template';

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

  getChartOptions(): any {
    const { columnsByBlock } = this.dataSettings;
    const settings = this.settings;
    //
    const latPath = columnsByBlock[EBlockKey.Lat][0]?.path;
    const lonPath = columnsByBlock[EBlockKey.Lon][0]?.path;
    const valsPaths = columnsByBlock[EBlockKey.Values].map((item) => item.path);

    console.log('this.data', this.data);
    

    const dataset = this.data.map((item) => {
      console.log('item', item);
      console.log('item[latPath]', item[latPath]);
      console.log('Number(item[latPath])', Number(item[latPath]));
      
      return {
        lat: Number(item[latPath]) || 0,
        lon: Number(item[lonPath]) || 0,
        ...valsPaths.reduce((acc, valPath, index) => {
          acc[`val_${index}`] = item[valPath];
          return acc;
        }, {}),
      };
    });

    getMapTpl(settings, dataset, this);
    // getTitleTpl(settings);
    getHeatTpl(settings, dataset, this);
    getClusterTpl(settings, dataset, this);
    getTooltipTpl(settings, dataset, this);
  }

  private chartInit = () => {
    this.settings = { ...this.viewSettings };

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

      this.chartInit();
    }

    return this._chart;
  };

  onChange(): void {
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
