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
  newVals,
  showTotal,
  showTotalH,
  showTotalPaging,
  showTotalV,
} from './constants';
import {
  getBlockLabel,
  getHR,
  getValuesNew,
  getSelectItems,
  getValuesHideSelect,
} from './utils';

export const createViewSettings: CreateViewSettings<DataSettings> = ({
  dataSettings,
  viewSettings,
}: {
  dataSettings: DataSettings;
  viewSettings: ViewSettings;
}) => {
  const { columnsByBlock } = dataSettings;
  //
  const rowsBlock = columnsByBlock[EBlockKey.ROWS];
  const valuesBlock = columnsByBlock[EBlockKey.VALUES];
  const valuesHideBlock = columnsByBlock[EBlockKey.VALUES_HIDE];
  //
  const valuesHideSelect = getValuesHideSelect(rowsBlock);
  // const newValsCount = viewSettings[EViewKey.newValsCount];
  //
  const valuesNew = getValuesNew(
    // typeof newValsCount !== 'undefined' ? +newValsCount : 1,
    3,
    valuesBlock,
    valuesHideSelect,
  );

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
      options: rowsBlock.map((_, index, arr) => {
        const isFirst = index === 0;
        const isLast = index === arr.length - 1;
        const isOnce = isFirst && isLast;
        let label =
          isFirst || isOnce
            ? 'Не разворачивать'
            : 'до ' + (index + 1).toString();
        label = isLast && !isOnce ? label + ' (Все уровни)' : label;

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
    checkbox({
      key: EViewKey.Digital,
      label: {
        ru: 'Включить разрядность значений',
        en: 'Enable Value Digital',
      },
      defaultValue: true,
    }),
    input({
      key: EViewKey.DigitalNum,
      label: {
        ru: 'Разрядность значений',
        en: 'Digital of values',
      },
      defaultValue: '2',
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
    checkbox({
      key: EViewKey.TotalTag,
      label: {
        ru: 'Подсветка значений с итогами',
        en: 'Showing Totals (With pagination)',
      },
      defaultValue: false,
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
    getHR(getBlockLabel('Ширина колонок (px)', 'Column Width (px)')),
    //
    input({
      key: EViewKey.FirstColWidth,
      label: {
        ru: 'Ширина столбца с Иерархией',
        en: 'Column width with Hierarchy',
      },
      defaultValue: '350',
    }),
    input({
      key: EViewKey.ContentWidth,
      label: {
        ru: `Ширина контента`,
        en: `Content width`,
      },
      defaultValue: '500',
    }),
    input({
      key: EViewKey.TotalColWidth,
      label: {
        ru: 'Ширина столбца с Итогами',
        en: 'Column width with totals',
      },
      defaultValue: '200',
    }),
    //
    getHR(getBlockLabel('Показатели', 'Indicators')),
    //
    checkbox({
      key: EViewKey.isValuesNumber,
      label: {
        ru: 'Все показатели как числа',
        en: 'All indicators as numbers',
      },
      defaultValue: false,
    }),
    // 
    ...valuesHideBlock.map((valueBlock) => {
      return select({
        key: `HideValue_${valueBlock.path}`,
        label: {
          ru: `Отображать показатель "${valueBlock.name}" на уровне`,
          en: `Display indicator "${valueBlock.name}" on level`,
        },
        options: valuesHideSelect.options,
        defaultValue: valuesHideSelect.defaultValue,
      });
    }),
    //
    // select({
    //   key: EViewKey.newValsCount,
    //   label: {
    //     ru: 'Кол-во новых показателей',
    //     en: 'Number of new indicators',
    //   },
    //   options: newVals.map(getSelectItems),
    //   defaultValue: newVals[1][0],
    // }),
    //
    ...valuesNew.flat(),
  ];
};

export const validation: ViewSettingsValidation = {};
