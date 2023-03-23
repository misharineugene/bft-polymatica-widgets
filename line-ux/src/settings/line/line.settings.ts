import { input, checkbox, select } from 'ptnl-constructor-sdk/config';
// utils
import { getSelectItems } from '../../utils/getSelectItems';
// consts
import { colorBy, type } from './line.consts';
// types
import { LineEViewKey } from './line.types';

export const getLineSettings = () => {
  return [
    input({
      key: LineEViewKey.ColorBy,
      label: {
        ru: 'Цвет элемента',
        en: 'Item color',
      },
      defaultValue: colorBy[0][0],
    }),
    select({
      key: LineEViewKey.ColorBy,
      label: {
        ru: 'Цвет элемента',
        en: 'Item color',
      },
      options: colorBy.map(getSelectItems),
      defaultValue: colorBy[0][0],
    }),
    /////////////////////////////////////
    checkbox({
      key: LineEViewKey.Stack,
      label: {
        ru: 'Групировка',
        en: 'Stack',
      },
      defaultValue: false,
    }),
    /////////////////////////////////////
    input({
      key: LineEViewKey.Type,
      label: {
        ru: 'Тип линий',
        en: 'Line type',
      },
      defaultValue: type[0][0],
    }),
    select({
      key: LineEViewKey.Type,
      label: {
        ru: 'Тип линий',
        en: 'Line type',
      },
      options: type.map(getSelectItems),
      defaultValue: type[0][0],
    }),
    /////////////////////////////////////
    checkbox({
      key: LineEViewKey.Area,
      label: {
        ru: 'Закрасить область под линией',
        en: 'Fill in the area under the line',
      },
      defaultValue: false,
    }),
    input({
      key: LineEViewKey.AreaOpacity,
      label: {
        ru: 'Прозрачность закрашенной области',
        en: 'Filled area transparency',
      },
      defaultValue: '0.7',
    }),
    checkbox({
      key: LineEViewKey.AreaGradient,
      label: {
        ru: 'Градиент закрашенной области',
        en: 'Filled area gradient',
      },
      defaultValue: false,
    }),
  ];
};
