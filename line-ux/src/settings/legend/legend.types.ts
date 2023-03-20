import * as echarts from 'echarts';

export type LegendType = echarts.EChartOption.Legend;

export enum LegendEViewKey {
  Show = 'legendShow',
  //
  Type = 'legendType',
  //
  Left = 'legendLeft',
  Top = 'legendTop',
  Right = 'legendRight',
  Bottom = 'legendBottom',
  //
  Width = 'legendWidth',
  Height = 'legendHeight',
  ItemGap = 'legendItemGap',
  //
  Orient = 'legendOrient',
  //
  Html = 'legendHtml',
  Text = 'legendText',
  FontSize = 'legendFontSize',
  Color = 'legendColor',
  Bold = 'legendBold',
  Italic = 'legendItalic',
  LineHeight = 'legendLineHeight',
  TextAlign = 'legendTextAlign',
  Rich = 'legendRich',
  //
  IconType = 'legendIconType',
}
