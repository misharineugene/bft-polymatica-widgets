import * as echarts from 'echarts';

export type TooltipType = echarts.EChartOption.Tooltip;

export enum TooltipEViewKey {
  Show = 'tooltipShow',
  //
  Trigger = 'tooltipTrigger',
  TriggerOn = 'tooltipTriggerOn',
  //
  Html = 'tooltipHtml',
  Text = 'tooltipText',
  FontSize = 'tooltipFontSize',
  Color = 'tooltipColor',
  Bold = 'tooltipBold',
  Italic = 'tooltipItalic',
  LineHeight = 'tooltipLineHeight',
  TextAlign = 'tooltipTextAlign',
  Rich = 'tooltipRich',
}
