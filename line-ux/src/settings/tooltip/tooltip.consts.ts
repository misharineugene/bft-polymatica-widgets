// types
import { TooltipEViewKey, TooltipType } from './tooltip.types';

export const trigger = [
  ['item', 'Элемент', 'Element'],
  ['axis', 'Ось', 'Axis'],
];

export const triggerOn = [
  ['mousemove', 'Наведение мыши', 'Mouse move'],
  ['click', 'Клик', 'Click'],
];

export const getSettings = (settings): TooltipType => {
  return {
    show: settings[TooltipEViewKey.Show],
    //
    trigger: settings[TooltipEViewKey.Trigger],
    triggerOn: settings[TooltipEViewKey.TriggerOn],
    //
    formatter: settings[TooltipEViewKey.Html],
  };
};
