import { input, checkbox } from 'ptnl-constructor-sdk/config';
// types
import { MapEViewKey } from './map.types';

export const getMapSettings = () => {
  return [
    input({
      key: MapEViewKey.Center,
      label: {
        ru: 'Координаты центра карты',
        en: 'Map center coordinates',
      },
      defaultValue: '66.25, 94.15',
    }),
    input({
      key: MapEViewKey.Zoom,
      label: {
        ru: 'Зум при инициализации',
        en: 'Zoom on initialization',
      },
      defaultValue: '3',
    }),
    //
    checkbox({
      key: MapEViewKey.Mask,
      label: {
        ru: 'Ограничить зону видимости карты',
        en: 'Restrict map visibility',
      },
      defaultValue: true,
    }),
    input({
      key: MapEViewKey.MaskOpacity,
      label: {
        ru: 'Плотность маски скрываемой области',
        en: 'Hidden Area Mask Density',
      },
      defaultValue: '1',
    }),
  ];
};
