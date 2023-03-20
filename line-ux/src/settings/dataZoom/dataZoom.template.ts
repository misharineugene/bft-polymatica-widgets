// consts
import { getDataZoomMargin, getSettings } from './dataZoom.consts';
// types
import { DataZoomType } from './dataZoom.types';

export function getDataZoomTpl(settings, seriesName): DataZoomType[] {
  const settingsObj = getSettings(settings);
  //
  const { show, inside } = settingsObj;
  //
  const { left, top, right, bottom } = getDataZoomMargin(
    settingsObj,
    seriesName,
  );
  //
  const optionArr = [];

  if (inside) optionArr.push({ type: 'inside' });

  optionArr.push({
    show,
    //
    left,
    top,
    right,
    bottom,
  });

  return optionArr;
}
