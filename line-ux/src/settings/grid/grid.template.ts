// consts
import { getGridMargin, getSettings } from './grid.consts';
// types
import { GridType } from './grid.types';

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
