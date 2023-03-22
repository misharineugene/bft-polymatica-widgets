import { checkbox, input, select } from 'ptnl-constructor-sdk/config';
// utils
import { getSelectItems } from './../../utils/getSelectItems';
// types
import { EBlockKey } from './../../enum';
import { HeatEViewKey } from './heat.types';

export const getHeatSettings = (dataSettings) => {
  const { columnsByBlock } = dataSettings;
  const values = columnsByBlock[EBlockKey.Values];

  const valuesArr = values.map(({ name }, index) => {
    return [`val_${index}`, name, name];
  });

  return [
    checkbox({
      key: HeatEViewKey.Show,
      label: {
        ru: 'Тепловая карта',
        en: 'Heat map',
      },
      defaultValue: false,
    }),
    //
    input({
      key: HeatEViewKey.Radius,
      label: {
        ru: 'Радиус',
        en: 'Radius',
      },
      defaultValue: '50',
    }),
    //
    input({
      key: HeatEViewKey.Value,
      label: {
        ru: 'Сравниваемый показатель',
        en: 'Comparable indicator',
      },
      defaultValue: valuesArr[0]?.[0] || '',
    }),
    select({
      key: HeatEViewKey.Value,
      label: {
        ru: 'Сравниваемый показатель',
        en: 'Comparable indicator',
      },
      options: valuesArr.map(getSelectItems),
      defaultValue: valuesArr[0]?.[0] || '',
    }),
  ];
};
