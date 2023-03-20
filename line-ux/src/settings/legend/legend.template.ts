// consts
import { getLegendMargin, getSettings } from './legend.consts';
// types
import { LegendType } from './legend.types';

export function getLegendTpl(settings): LegendType {
  const settingsObj = getSettings(settings);
  //
  const {
    show,
    //
    type,
    //
    width,
    height,
    itemGap,
    //
    align,
    //
    orient,
    //
    formatter,
    //
    color,
    fontStyle,
    fontWeight,
    fontSize,
    lineHeight,
    rich,
    //
    icon,
  } = settingsObj;
  //
  const { top, bottom, left, right } = getLegendMargin(settingsObj);

  return {
    show,
    //
    type,
    //
    left,
    top,
    right,
    bottom,
    //
    width,
    height,
    itemGap: Number(itemGap) || 10,
    //
    align,
    //
    orient,
    //
    formatter,
    //
    textStyle: {
      color,
      fontStyle: fontStyle === 'italic' ? fontStyle : 'normal',
      fontWeight: fontWeight === 'bold' ? fontWeight : 'normal',
      fontSize,
      lineHeight,
      rich,
    },
    //
    ...(icon !== 'auto' && { icon }),
  };
}
