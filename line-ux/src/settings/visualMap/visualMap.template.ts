// consts
import { getGridMargin, getSettings } from './visualMap.consts';
// types
import { GridType } from './visualMap.types';

export function getGridTpl(settings, sItems, xItems): GridType {
  const settingsObj = getSettings(settings);
  //
  const { show } = settingsObj;
  //
  const { left, top, right, bottom } = getGridMargin(
    settingsObj,
    sItems,
    xItems,
  );

  return {
    show,
    //
    left,
    top,
    right,
    bottom,
  };
}
