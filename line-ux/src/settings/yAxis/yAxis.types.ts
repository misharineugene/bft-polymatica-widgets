import * as echarts from 'echarts';

export type YAxisType = echarts.EChartOption.YAxis;

export enum YAxisEViewKey {
  Show = 'yAxisShow',
  //
  Position = 'yAxisPosition',
  //
  Type = 'yAxisType',
  //
  Inverse = 'yAxisInverse',
  //
  Min = 'yAxisMin',
  Max = 'yAxisMax',
  //
  LabelInterval = 'yAxisLabelInterval',
  LabelRotate = 'yAxisLabelRotate',
  //
  LabelHtml = 'yAxisLabelHtml',
  LabelText = 'yAxisLabelText',
  LabelFontSize = 'yAxisLabelFontSize',
  LabelColor = 'yAxisLabelColor',
  LabelBold = 'yAxisLabelBold',
  LabelItalic = 'yAxisLabelItalic',
  LabelLineHeight = 'yAxisLabelLineHeight',
  LabelTextAlign = 'yAxisLabelTextAlign',
  LabelRich = 'yAxisLabelRich',
}
