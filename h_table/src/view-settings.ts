import {
  checkbox,
  colorPicker,
  CreateViewSettings,
  input,
  select,
  ViewSettingsValidation,
} from 'ptnl-constructor-sdk/config';
import { DataSettings, ViewSettings } from 'ptnl-constructor-sdk';
//
import { EBlockKey, EViewKey } from './enum';
import {
  showTotal,
  showTotalH,
  showTotalPaging,
  showTotalV,
} from './constants';
import { getBlockLabel, getHR, getSelectItems } from './utils';

export const createViewSettings: CreateViewSettings<DataSettings> = ({
  dataSettings,
  viewSettings,
}: {
  dataSettings: DataSettings;
  viewSettings: ViewSettings;
}) => {
  const { columnsByBlock } = dataSettings;
  const rows = columnsByBlock[EBlockKey.ROWS];

  return [
    input({
      key: EViewKey.FirstColName,
      label: {
        ru: 'Наименование столбца с Иерархией',
        en: 'Column name with Hierarchy',
      },
      defaultValue: 'Наименование',
    }),
    //
    colorPicker({
      key: EViewKey.HeadColor,
      label: {
        ru: 'Настройка цвета размерностей и заголовков',
        en: 'Customize the color of dimensions and titles',
      },
      defaultValue: '#d1d5db',
    }),
    //
    select({
      key: EViewKey.DefaultOpenLvl,
      label: {
        ru: 'Разворачивание уровней',
        en: 'Hierarchy display by default',
      },
      options: rows.map((_, index) => {
        const label = index === 0 ? 'Не разворачивать' : index.toString();

        return {
          label: {
            ru: label,
            en: label,
          },
          value: index.toString(),
        };
      }),
      defaultValue: '0',
    }),
    //
    getHR(getBlockLabel('Итоги', 'Totals')),
    //
    select({
      key: EViewKey.Total,
      label: {
        ru: 'Показывать итоги',
        en: 'Show totals',
      },
      options: showTotal.map(getSelectItems),
      defaultValue: showTotal[3][0],
    }),
    select({
      key: EViewKey.TotalH,
      label: {
        ru: 'Вывод итогов для строк',
        en: 'Showing Totals for Rows',
      },
      options: showTotalH.map(getSelectItems),
      defaultValue: showTotalH[1][0],
    }),
    select({
      key: EViewKey.TotalV,
      label: {
        ru: 'Вывод итогов для колонок',
        en: 'Showing Totals for Columns',
      },
      options: showTotalV.map(getSelectItems),
      defaultValue: showTotalV[1][0],
    }),
    checkbox({
      key: EViewKey.TotalHFixed,
      label: {
        ru: 'Фиксация колонки с итогами',
        en: 'Fixing a column with totals',
      },
      defaultValue: false,
    }),
    checkbox({
      key: EViewKey.TotalVFixed,
      label: {
        ru: 'Фиксация строки с итогами',
        en: 'Fixing a line with totals',
      },
      defaultValue: false,
    }),
    select({
      key: EViewKey.TotalPaging,
      label: {
        ru: 'Вывод итогов (С пагинацией)',
        en: 'Showing Totals (With pagination)',
      },
      options: showTotalPaging.map(getSelectItems),
      defaultValue: showTotalPaging[0][0],
    }),
    //
    getHR(getBlockLabel('Пагинация', 'Pagination')),
    //
    checkbox({
      key: EViewKey.Pagination,
      label: {
        ru: 'Включить пагинацию',
        en: 'Pagintaion',
      },
      defaultValue: false,
    }),
    input({
      key: EViewKey.PageSize,
      label: {
        ru: 'Кол-во записей на странице',
        en: 'Number of records per page',
      },
      defaultValue: '10',
    }),
    //
    getHR(getBlockLabel('Показатели', 'Indicators')),
    //
    ...columnsByBlock[EBlockKey.VALUES_HIDE].map((valueBlock) => {
      return select({
        key: `HideValue_${valueBlock.path}`,
        label: {
          ru: `Отображать показатель "${valueBlock.name}" на уровне`,
          en: `Display indicator "${valueBlock.name}" on level`,
        },
        options: rows.map((_, index) => {
          const isFirst = index === 0;
          const revIdx = rows.length - 1 - index;
          const value = revIdx.toString();
          //
          let label = (revIdx + 1).toString();
          label = isFirst ? label : label + ' — ' + rows.length;

          return {
            label: {
              ru: label,
              en: label,
            },
            value: value,
          };
        }),
        defaultValue: (rows.length - 1).toString(),
      });
    }),
  ];
};

export const validation: ViewSettingsValidation = {};
