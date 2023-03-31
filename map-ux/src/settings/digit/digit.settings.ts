import { input, checkbox } from 'ptnl-constructor-sdk/config';
// types
import { DigitEViewKey } from './digit.types';

export const getDigitSettings = () => {
  return [
    checkbox({
      key: DigitEViewKey.Show,
      label: {
        ru: 'Включить',
        en: 'Enable',
      },
      defaultValue: true,
    }),
    //
    input({
      key: DigitEViewKey.Number,
      label: {
        ru: 'Кол-во знаков после запятой',
        en: 'Number of decimal places',
      },
      defaultValue: '2',
    }),
  ];
};
