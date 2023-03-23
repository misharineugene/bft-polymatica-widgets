// types
import { LineEViewKey } from './line.types';

export const colorBy = [
  ['series', 'От номера серии', 'From series number'],
  ['data', 'От номера элемента', 'From item number'],
];

export const type = [
  ['default', 'Стандартный', 'Default'],
  ['step', 'Лесинка', 'Step'],
  ['smooth', 'Сглаживание', 'Smooth'],
];

export const getSettings = (settings) => {
  return {
    colorBy: settings[LineEViewKey.ColorBy],
    //
    stack: settings[LineEViewKey.Stack],
    //
    type: settings[LineEViewKey.Type],
    //
    area: settings[LineEViewKey.Area],
    opacity: settings[LineEViewKey.AreaOpacity] || '0.7',
    gradient: settings[LineEViewKey.AreaGradient],
  };
};
