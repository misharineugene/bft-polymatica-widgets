import * as echarts from 'echarts';

export type LineType = echarts.LineSeriesOption;

export enum LineEViewKey {
  ColorBy = 'lineColorBy',
  //
  Stack = 'lineStack',
  //
  Type = 'lineType',
  //
  Area = 'lineArea',
  AreaOpacity = 'lineAreaOpacity',
  AreaGradient = 'lineAreaGradient',
}
