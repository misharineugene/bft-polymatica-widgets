import * as echarts from 'echarts';

export type VisualMapType = echarts.EChartOption.VisualMap;

export enum VisualMapEViewKey {
  Show = 'visualMapShow',
  //
  Left = 'visualMapLeft',
  Top = 'visualMapTop',
  Right = 'visualMapRight',
  Bottom = 'visualMapBottom',
}
