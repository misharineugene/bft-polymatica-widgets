// consts
import { getSettings } from './yAxis.consts';
// types
import { YAxisType } from './yAxis.types';

export function getYAxisTpl(settings): YAxisType {
  const settingsObj = getSettings(settings);

  return settingsObj;
}
