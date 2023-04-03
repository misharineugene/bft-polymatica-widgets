import * as echarts from 'echarts';

export type XAxisType = echarts.EChartOption.XAxis;

export enum XAxisEViewKey {
  Show = 'xAxisShow',
  //
  Position = 'xAxisPosition',
  //
  Type = 'xAxisType',
  //
  Inverse = 'xAxisInverse',
  //
  Min = 'xAxisMin',
  Max = 'xAxisMax',
  //
  LabelInterval = 'xAxisLabelInterval',
  LabelRotate = 'xAxisLabelRotate',
  //
  LabelHtml = 'xAxisLabelHtml',
  LabelText = 'xAxisLabelText',
  LabelFontSize = 'xAxisLabelFontSize',
  LabelColor = 'xAxisLabelColor',
  LabelBold = 'xAxisLabelBold',
  LabelItalic = 'xAxisLabelItalic',
  LabelLineHeight = 'xAxisLabelLineHeight',
  LabelTextAlign = 'xAxisLabelTextAlign',
  LabelRich = 'xAxisLabelRich',
}
