import { input, checkbox } from 'ptnl-constructor-sdk/config';
// types
import { DataZoomEViewKey } from './dataZoom.types';

export const getDataZoomSettings = () => {
  return [
    checkbox({
      key: DataZoomEViewKey.Show,
      label: {
        ru: 'Показывать',
        en: 'Show',
      },
      defaultValue: false,
    }),
    /////////////////////////////////////
    input({
      key: DataZoomEViewKey.Left,
      label: {
        ru: 'Отступ слева',
        en: 'Left margin',
      },
      defaultValue: 'center',
    }),
    input({
      key: DataZoomEViewKey.Top,
      label: {
        ru: 'Отступ сверху',
        en: 'Top margin',
      },
      defaultValue: 'bottom',
    }),
    input({
      key: DataZoomEViewKey.Right,
      label: {
        ru: 'Отступ справа',
        en: 'Right margin',
      },
      defaultValue: 'auto',
    }),
    input({
      key: DataZoomEViewKey.Bottom,
      label: {
        ru: 'Отступ снизу',
        en: 'Bottom margin',
      },
      defaultValue: 'auto',
    }),
    /////////////////////////////////////
    checkbox({
      key: DataZoomEViewKey.Inside,
      label: {
        ru: 'Масштабирование колесиком мыши',
        en: 'Mouse wheel zoom',
      },
      defaultValue: true,
    }),
  ];
};
