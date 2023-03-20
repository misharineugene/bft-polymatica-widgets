// consts
import { getSettings } from './tooltip.consts';
// types
import { TooltipType } from './tooltip.types';

export function getTooltipTpl(settings): TooltipType {
  const settingsObj = getSettings(settings);

  return settingsObj;
}
