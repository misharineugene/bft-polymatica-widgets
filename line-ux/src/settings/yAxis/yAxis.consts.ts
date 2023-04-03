// utils
import { richToOption } from '../../utils/richToOption';
// types
import { YAxisEViewKey, YAxisType } from './yAxis.types';

export const position = [
  ['left', 'Слева', 'Left'],
  ['right', 'Справа', 'Right'],
];

export const getSettings = (settings): YAxisType => {
  const { text, rich } = richToOption({
    richStr: settings[YAxisEViewKey.LabelRich],
    text: settings[YAxisEViewKey.LabelText],
  });
  const show = settings[YAxisEViewKey.Show];
  //
  const min = settings[YAxisEViewKey.Min];
  const max = settings[YAxisEViewKey.Max];

  return {
    show,
    //
    position: settings[YAxisEViewKey.Position],
    //
    type: settings[YAxisEViewKey.Type],
    //
    inverse: settings[YAxisEViewKey.Inverse],
    //
    axisLine: {
      show,
    },
    axisTick: {
      show,
    },
    //
    ...(min && { min }),
    ...(max && { max }),
    //
    axisLabel: {
      interval: settings[YAxisEViewKey.LabelInterval] || 'auto',
      rotate: settings[YAxisEViewKey.LabelRotate],
      //
      formatter: text,
      color: settings[YAxisEViewKey.LabelColor] || '#000',
      fontStyle:
        settings[YAxisEViewKey.LabelItalic] && !rich ? 'italic' : 'normal',
      fontWeight:
        settings[YAxisEViewKey.LabelBold] && !rich ? 'bold' : 'normal',
      fontSize: !rich ? settings[YAxisEViewKey.LabelFontSize] || '12' : '12',
      lineHeight: !rich ? settings[YAxisEViewKey.LabelLineHeight] || '1' : '1',
      align: !rich
        ? settings[YAxisEViewKey.LabelTextAlign] || 'right'
        : 'right',
      rich: rich || {},
    },
  };
};
