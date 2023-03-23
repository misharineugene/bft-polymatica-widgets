import { Declare, SingleData, Widget } from 'ptnl-constructor-sdk';
import { FilterMethod, Target } from 'ptnl-constructor-sdk/data';
// enum
import { EBlockKey } from './enum';
// utils
import { getMode } from './utils/getMode';
// editor
import { initEditor } from './editor';
// templates
import { getTitleTpl } from './settings/title/title.template';
import { getLegendTpl } from './settings/legend/legend.template';
import { getGridTpl } from './settings/grid/grid.template';
import { getXAxisTpl } from './settings/xAxis/xAxis.template';
import { getYAxisTpl } from './settings/yAxis/yAxis.template';
import { getDataZoomTpl } from './settings/dataZoom/dataZoom.template';
import { getTooltipTpl } from './settings/tooltip/tooltip.template';
// types
import { SettingType } from './types';
import * as echarts from 'echarts';
import ECharts = echarts.ECharts;
import { getLineTpl } from './settings/line/line.template';

@Declare({
  provideCssVariables: true,
})
export class LineUx extends Widget implements SingleData {
  readonly data!: SingleData['data'];
  readonly dataSettings!: SingleData['dataSettings'];
  //
  private _chart?: ECharts;
  private hasCategory = false;
  //
  private settings: SettingType = {};

  getDataByPath(path: string): string[] {
    return this.data.map((item) => item[path]);
  }

  getUniqueDataByPath(path: string): string[] {
    return Array.from(new Set(this.getDataByPath(path)));
  }

  getDataConfig() {
    const { columnsByBlock } = this.dataSettings;
    //
    const xBlock = columnsByBlock[EBlockKey.X];
    const yBlock = columnsByBlock[EBlockKey.Y];
    const sBlock = columnsByBlock[EBlockKey.S];
    //
    this.hasCategory = sBlock.length ? true : false;
    //
    const xPath = xBlock.length ? xBlock[0].path : null;
    const yPaths = yBlock.length ? yBlock.map((item) => item.path) : null;
    const sPath = sBlock.length ? sBlock[0].path : null;
    //
    const xItems = xPath ? this.getUniqueDataByPath(xPath) : [];
    const yItems = yPaths ? yBlock.map((item) => item.name) : [];
    const sItems = sPath ? this.getUniqueDataByPath(sPath) : [];
    //
    const sNames = [];
    //
    if (sItems.length) {
      sItems.forEach((sItem) => {
        yItems.forEach((yItem) => {
          sNames.push(yItems.length > 1 ? sItem + ' - ' + yItem : sItem);
        });
      });
    } else {
      sNames.push(...yItems);
    }
    //
    const dataset: object[] = [
      {
        source: this.data,
      },
    ];

    if (sPath) {
      sItems.forEach((item) => {
        dataset.push({
          transform: {
            type: 'filter',
            config: { dimension: sPath, value: item },
          },
        });
      });
    }

    return {
      xPath,
      yPaths,
      sPath,
      //
      xItems,
      yItems,
      sItems,
      //
      sNames,
      dataset,
    };
  }

  getChartOptions(): any {
    const settings = this.settings;

    const dataConfig = this.getDataConfig();
    const {
      xItems,
      sNames,
      //
      dataset,
    } = dataConfig;

    const result = {
      dataset,
      //
      title: getTitleTpl(settings),
      legend: getLegendTpl(settings),
      grid: getGridTpl(settings, sNames, xItems),
      xAxis: getXAxisTpl(settings),
      yAxis: getYAxisTpl(settings),
      dataZoom: getDataZoomTpl(settings, sNames),
      tooltip: getTooltipTpl(settings),
      series: getLineTpl(settings, dataConfig),
      textStyle: { fontFamily: 'Arial' },
    };

    return result;
  }

  private onClick = (params) => {
    const { dataIndex, seriesIndex, name } = params;
    const { columnsByBlock } = this.dataSettings;
    const colKey = EBlockKey[this.hasCategory ? 'S' : 'X'];

    const filter = {
      column: columnsByBlock[colKey][0],
      method: FilterMethod.Equal,
      value: name,
    };

    this.dataSettings.setFilter(filter, seriesIndex, Target.Other);
    this.dataSettings.interact(dataIndex);
  };

  private chartInit = () => {
    this.settings = { ...this.viewSettings };
    // const settings = this.viewSettings;
    const theme = null;
    // const theme =
    //     (settings[themeSettings.Follow] && getLSU('theme')) ||
    //     settings[themeSettings.Theme];
    const dom = document.getElementById('view') as HTMLDivElement;

    // if (theme !== 'DEFAULT') echarts.registerTheme(theme, THEMES[theme]);
    this._chart = echarts.init(dom, theme, { renderer: 'svg' });
    this._chart.setOption(this.getChartOptions());

    this._chart?.off('click', this.onClick);
    this._chart?.on('click', this.onClick);
  };

  private chart = () => {
    if (typeof this._chart === 'undefined') {
      this.chartInit();
    } else {
      this._chart.dispose();
      this.chartInit();
    }

    return this._chart;
  };

  private chartResize = () => {
    if (this._chart) {
      this._chart.setOption(this.getChartOptions());
      this._chart.resize();
    }
  };

  onChange(): void {
    this.chart();

    window.removeEventListener('resize', this.chartResize);
    window.addEventListener('resize', this.chartResize);

    this.ready();
  }

  onLangChange(): void {
    this._chart?.setOption(this.getChartOptions());
  }

  onThemeChange(): void {
    this._chart?.setOption(this.getChartOptions());
  }

  onInit(): void {
    if (getMode() === 'prod') initEditor(this);

    this.dataSettings.events.onOtherFilterChange = (filter) => {
      console.log('onOtherFilterChange', filter);
      // this._chart?.setOption(this.getChartOptions());
    };
  }
}
