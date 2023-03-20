// utils
import { richToOption } from '../../utils/richToOption';
import { getHeightByContent, getStyles } from '../../utils/setMargin';
// types
import { XAxisEViewKey } from './xAxis.types';

export const position = [
  ['top', 'Сверху', 'Top'],
  ['bottom', 'Снизу', 'Bottom'],
];

export const xAxisIndent = { vp: 8 };

export const getXAxisHeight = (settings, seriesNames) => {
  const { xAxisRotate } = settings;

  let content = seriesNames[0];

  if (xAxisRotate != 0) {
    seriesNames.forEach((label) => {
      content = label.length > content.length ? label : content;
    });
  }

  const { xAxis: styles } = getStyles(settings);

  return getHeightByContent(content, styles);
};

export const getSettings = (settings) => {
  const { text, rich } = richToOption({
    richStr: settings[XAxisEViewKey.LabelRich],
    text: settings[XAxisEViewKey.LabelText],
  });

  return {
    show: settings[XAxisEViewKey.Show],
    //
    position: settings[XAxisEViewKey.Position],
    //
    type: settings[XAxisEViewKey.Type],
    //
    min: settings[XAxisEViewKey.Min],
    max: settings[XAxisEViewKey.Max],
    //
    interval: settings[XAxisEViewKey.LabelInterval] || 'auto',
    rotate: settings[XAxisEViewKey.LabelRotate],
    //
    formatter: text,
    color: settings[XAxisEViewKey.LabelColor] || '#000',
    fontStyle:
      settings[XAxisEViewKey.LabelItalic] && !rich ? 'italic' : 'normal',
    fontWeight: settings[XAxisEViewKey.LabelBold] && !rich ? 'bold' : 'normal',
    fontSize: !rich ? settings[XAxisEViewKey.LabelFontSize] || '12' : '12',
    lineHeight: !rich ? settings[XAxisEViewKey.LabelLineHeight] || '18' : '18',
    align: !rich
      ? settings[XAxisEViewKey.LabelTextAlign] || 'center'
      : 'center',
    rich: rich || {},
  };
};
