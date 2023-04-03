// consts
import { getSettings } from './xAxis.consts';
// types
import { XAxisType } from './xAxis.types';

export function getXAxisTpl(settings): XAxisType {
  const settingsObj = getSettings(settings);
  //
  const {
    show,
    position,
    type,
    //
    inverse,
    //
    min,
    max,
    //
    interval,
    rotate,
    //
    formatter,
    color,
    fontStyle,
    fontWeight,
    fontSize,
    lineHeight,
    align,
    rich,
  } = settingsObj;

  return {
    show,
    //
    position,
    //
    type,
    //
    inverse,
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
      interval,
      rotate,
      //
      formatter,
      color,
      fontStyle: fontStyle === 'italic' ? fontStyle : 'normal',
      fontWeight: fontWeight === 'bold' ? fontWeight : 'normal',
      fontSize,
      lineHeight,
      align,
      rich,
    },
  };
}
