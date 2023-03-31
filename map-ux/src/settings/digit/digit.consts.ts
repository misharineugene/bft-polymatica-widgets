// types
import { DigitEViewKey } from './digit.types';

export const toDigital = (value, number) => {
  if (!isNaN(Number(value)) && !isNaN(Number(number))) {
    return Number(value)
      .toFixed(number)
      .split('.')
      .map((item, index) => {
        return index === 0 ? (+item).toLocaleString() : item;
      })
      .join(',');
  }

  return value.toLocaleString();
};

export const getSettings = (settings) => {
  return {
    show: settings[DigitEViewKey.Show],
    //
    number: settings[DigitEViewKey.Number] || 2,
  };
};
