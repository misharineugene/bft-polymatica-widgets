// types
import { TooltipEViewKey } from './tooltip.types';

export const triggerOn = [
  ['mouseover', 'Наведение мыши', 'Mouse move'],
  ['click', 'Клик', 'Click'],
];

export const getSettings = (settings) => {
  return {
    show: settings[TooltipEViewKey.Show],
    //
    triggerOn: settings[TooltipEViewKey.TriggerOn],
  };
};
