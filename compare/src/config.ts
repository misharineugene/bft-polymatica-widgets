import {
  block,
  Config,
  DataQueryFunction,
  DataQueryMethod,
  filter,
} from 'ptnl-constructor-sdk/config';
import { ColumnType } from 'ptnl-constructor-sdk/data';
//
import { EBlockKey } from './enum';

export const config: Config = {
  label: {
    ru: 'Сравнение (U)',
    en: 'Compare (U)',
  },
  icon: 'icon.svg',

  dataSettings: {
    method: DataQueryMethod.Aggregate,

    blocks: [
      block({
        key: EBlockKey.VALUE_1,
        dataQueryFunction: DataQueryFunction.Sum,
        label: {
          ru: 'Показатель 1',
          en: 'Indicator 1',
        },
        columnTypes: [ColumnType.Number],
        max: 1,
      }),
      block({
        key: EBlockKey.VALUE_2,
        dataQueryFunction: DataQueryFunction.Sum,
        label: {
          ru: 'Показатель 2',
          en: 'Indicator 2',
        },
        columnTypes: [ColumnType.Number],
        max: 1,
      }),
      filter(),
    ]
  },
};
