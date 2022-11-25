import {
  block,
  Config,
  DataQueryFunction,
  DataQueryMethod,
  drilldown,
  filter,
  sort,
} from 'ptnl-constructor-sdk/config';
import { ColumnType } from 'ptnl-constructor-sdk/data';
//
import { EBlockKey } from './enum';

export const config: Config = {
  label: {
    ru: 'Иерархическая таблица - Antd (U) - v2.0',
    en: 'Hierarchical table - Antd (U) - v2.0',
  },
  icon: 'icon.svg',

  dataSettings: {
    method: DataQueryMethod.Aggregate,

    blocks: [
      block({
        key: EBlockKey.COLUMNS,
        dataQueryFunction: DataQueryFunction.Group,
        label: {
          ru: 'Столбцы',
          en: 'Columns',
        },
        columnTypes: [ColumnType.String, ColumnType.Date],
      }),
      block({
        key: EBlockKey.ROWS,
        dataQueryFunction: DataQueryFunction.Group,
        label: {
          ru: 'Строки',
          en: 'Rows',
        },
        columnTypes: [ColumnType.String, ColumnType.Date],
      }),
      block({
        key: EBlockKey.VALUES,
        dataQueryFunction: DataQueryFunction.Sum,
        label: {
          ru: 'Показатели',
          en: 'Indicators',
        },
        columnTypes: [ColumnType.Number],
      }),
      block({
        key: EBlockKey.VALUES_HIDE,
        dataQueryFunction: DataQueryFunction.Sum,
        label: {
          ru: 'Показатели для которых не рассчитывать итог',
          en: 'Indicators for which the total is not calculated',
        },
        columnTypes: [ColumnType.Number],
      }),
      filter(),
      sort(),
      drilldown({
        source: EBlockKey.COLUMNS,
        additionalFilterSources: [EBlockKey.ROWS],
      }),
    ],
    validation: {
      requiredSome: [EBlockKey.VALUES],
    },
  },
};
