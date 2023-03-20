import { input, checkbox } from 'ptnl-constructor-sdk/config';
// types
import { GridEViewKey } from './grid.types';

export const getGridSettings = () => {
  return [
    checkbox({
      key: GridEViewKey.Show,
      label: {
        ru: 'Показывать',
        en: 'Show',
      },
      defaultValue: false,
    }),
    /////////////////////////////////////
    input({
      key: GridEViewKey.Left,
      label: {
        ru: 'Отступ слева',
        en: 'Left margin',
      },
      defaultValue: 'auto',
    }),
    input({
      key: GridEViewKey.Top,
      label: {
        ru: 'Отступ сверху',
        en: 'Top margin',
      },
      defaultValue: 'auto',
    }),
    input({
      key: GridEViewKey.Right,
      label: {
        ru: 'Отступ справа',
        en: 'Right margin',
      },
      defaultValue: 'auto',
    }),
    input({
      key: GridEViewKey.Bottom,
      label: {
        ru: 'Отступ снизу',
        en: 'Bottom margin',
      },
      defaultValue: 'auto',
    }),
  ];
};
