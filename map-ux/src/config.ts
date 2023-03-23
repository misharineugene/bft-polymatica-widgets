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
    ru: 'Карта (UX)',
    en: 'Map (UX)',
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
          ru: 'Колонка для Drilldown',
          en: 'Column for Drilldown',
        },
        columnTypes: [ColumnType.String],
      }),
      //
      block({
        key: EBlockKey.Lat,
        dataQueryFunction: DataQueryFunction.Group,
        label: {
          ru: 'Широта',
          en: 'Latitube',
        },
        columnTypes: [ColumnType.Number, ColumnType.String],
        max: 1,
      }),
      block({
        key: EBlockKey.Lon,
        dataQueryFunction: DataQueryFunction.Group,
        label: {
          ru: 'Долгота',
          en: 'Longitube',
        },
        columnTypes: [ColumnType.Number, ColumnType.String],
        max: 1,
      }),
      //
      block({
        key: EBlockKey.Values,
        dataQueryFunction: DataQueryFunction.Group,
        label: {
          ru: 'Показатели',
          en: 'Indicators',
        },
        columnTypes: [ColumnType.Number, ColumnType.String, ColumnType.Date],
      }),
      //
      filter(),
      sort(),
      drilldown({
        source: EBlockKey.X,
      }),
    ],
  },
};
