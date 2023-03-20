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
import { EBlockKey } from './enum';

export const config: Config = {
  label: {
    ru: 'имя',
    en: 'name',
  },
  icon: 'icon.svg',

  documentation: {
    readme: 'widget/README.md',
    assetsDirectory: 'widget/documentation-assets',
    images: [],
  },

  dataSettings: {
    method: DataQueryMethod.Aggregate,

    blocks: [
      block({
        key: EBlockKey.X,
        dataQueryFunction: DataQueryFunction.Group,
        label: {
          ru: 'Ось X',
          en: 'X axis',
        },
        columnTypes: [ColumnType.String, ColumnType.Date],
        max: 1,
      }),
      block({
        key: EBlockKey.S,
        dataQueryFunction: DataQueryFunction.Group,
        label: {
          ru: 'Серия',
          en: 'Series',
        },
        columnTypes: [ColumnType.String, ColumnType.Date],
        max: 1,
      }),
      block({
        key: EBlockKey.Y,
        dataQueryFunction: DataQueryFunction.Sum,
        label: {
          ru: 'Ось Y',
          en: 'Y axis',
        },
        columnTypes: [ColumnType.Number],
      }),
      //
      filter(),
      sort(),
      drilldown({
        source: EBlockKey.X,
        additionalFilterSources: [EBlockKey.S],
      }),
    ],
  },
};
