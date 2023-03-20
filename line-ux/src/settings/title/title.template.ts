// consts
import { getSettings, getTitleMargin } from './title.consts';
// types
import { TitleType } from './title.types';

export function getTitleTpl(settings): TitleType {
  const settingsObj = getSettings(settings);
  //
  const {
    show,
    //
    text,
    //
    link,
    target,
    //
    color,
    fontStyle,
    fontWeight,
    fontSize,
    lineHeight,
    rich,
    //
    textAlign,
  } = settingsObj;
  //
  const { left, top, right, bottom } = getTitleMargin(settingsObj);

  return {
    show,
    //
    text,
    //
    link,
    target,
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
    textAlign,
    //
    left,
    top,
    right,
    bottom,
  };
}
