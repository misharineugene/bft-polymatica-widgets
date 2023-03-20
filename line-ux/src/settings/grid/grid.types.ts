import * as echarts from 'echarts';

export type GridType = echarts.EChartOption.Grid;

export enum GridEViewKey {
  Show = 'gridShow',
  //
  Left = 'gridLeft',
  Top = 'gridTop',
  Right = 'gridRight',
  Bottom = 'gridBottom',
  //
  Width = 'gridWidth',
}
