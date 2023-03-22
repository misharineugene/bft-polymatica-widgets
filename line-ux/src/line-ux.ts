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

  getDataByColumn(column: string): string[] {
    return this.data.map((item) => item[column]);
  }

  getChartOptions(): any {
    const { columnsByBlock } = this.dataSettings;
    const settings = this.settings;
    this.hasCategory = columnsByBlock[EBlockKey.S].length ? true : false;
    //
    const xPath = columnsByBlock[EBlockKey.X][0].path;
    const yPath = columnsByBlock[EBlockKey.Y][0].path;
    const sPath = this.hasCategory ? columnsByBlock[EBlockKey.S][0].path : null;
    //
    const seriesNames = this.hasCategory
      ? Array.from(new Set(this.getDataByColumn(sPath)))
      : [];

    const seriesNamesData = this.hasCategory
      ? this.getDataByColumn(sPath)
      : columnsByBlock[EBlockKey.Y].map((block) => block.name);

    const result = {
      title: getTitleTpl(settings),
      legend: getLegendTpl(settings),
      grid: getGridTpl(settings, seriesNamesData),
      xAxis: getXAxisTpl(settings),
      yAxis: getYAxisTpl(settings),
      dataZoom: getDataZoomTpl(settings, seriesNamesData),
      tooltip: getTooltipTpl(settings),
      textStyle: { fontFamily: 'Arial' },
      //
      dataset: [
        {
          source: this.data,
        },
        ...seriesNames.map((name) => {
          return {
            transform: {
              type: 'filter',
              config: { dimension: sPath, value: name },
            },
          };
        }),
      ],
      series: this.hasCategory
        ? seriesNames.map((name, index) => {
            return {
              name,
              type: 'line',
              encode: { x: xPath, y: yPath },
              datasetIndex: index + 1,
            };
          })
        : {
            name: columnsByBlock[EBlockKey.Y][0].name,
            type: 'line',
            encode: { x: xPath, y: yPath },
            datasetIndex: 0,
          },
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
