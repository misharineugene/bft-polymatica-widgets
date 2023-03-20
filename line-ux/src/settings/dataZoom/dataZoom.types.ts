import * as echarts from 'echarts';

export type DataZoomType = echarts.EChartOption.DataZoom;

export enum DataZoomEViewKey {
  Show = 'dataZoomShow',
  //
  Left = 'dataZoomLeft',
  Top = 'dataZoomTop',
  Right = 'dataZoomRight',
  Bottom = 'dataZoomBottom',
  //
  Inside = 'dataZoomInside',
}
