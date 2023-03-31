// consts
import { getSettings, toDigital } from './digit.consts';

export function getDigitTpl(settings) {
  const settingsObj = getSettings(settings);
  //
  const { show, number } = settingsObj;

  return (value) => {
    return show ? toDigital(value, number) : value;
  };
}
