import {
  checkbox,
  colorPicker,
  CreateViewSettings,
  input,
  select,
  ViewSettingsValidation,
} from 'ptnl-constructor-sdk/config';
import { DataSettings, ViewSettings } from 'ptnl-constructor-sdk';
import { EBlockKey, EViewKey } from './enum';
import { getBlockLabel, getHR, getSelectItems } from './utils';
import { fontSize } from './constants';

export const createViewSettings: CreateViewSettings<DataSettings> = ({
  dataSettings,
  viewSettings,
}: {
  dataSettings: DataSettings;
  viewSettings: ViewSettings;
}) => {
  const { columnsByBlock } = dataSettings;

  return [
    getHR(getBlockLabel('Заголовок', 'Title')),
    //
    checkbox({
      key: EViewKey.TitleShow,
      label: {
        ru: 'Отображать',
        en: 'Show',
      },
      defaultValue: false,
    }),
    input({
      key: EViewKey.TitleText,
      label: {
        ru: 'Значение заголовка',
        en: 'Title value',
      },
      defaultValue: '',
    }),
    select({
      key: EViewKey.TitleFontSize,
      label: {
        ru: 'Размер шрифта',
        en: 'Font Size',
      },
      options: fontSize.map(getSelectItems),
      defaultValue: fontSize[0][0],
    }),
    //
    getHR(getBlockLabel('Разрядность значений', 'Value Digital')),
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
    getHR(getBlockLabel('Показатели', 'Indicators')),
    //
    checkbox({
      key: EViewKey.IsValue_1_Name,
      label: {
        ru: 'Наименование «Показателя 1» из Наименования показателя',
        en: 'The name "Indicator 1" from the Name of the attribute',
      },
      defaultValue: true,
    }),
    input({
      key: EViewKey.Value_1_Name,
      label: {
        ru: 'Наименование Показателя 1',
        en: 'Name of Indicator 1',
      },
      defaultValue: 'Текущий год',
    }),
    //
    checkbox({
      key: EViewKey.IsValue_2_Name,
      label: {
        ru: 'Наименование «Показателя 2» из Наименования показателя 2',
        en: 'The name "Indicator 2" from the Name of the attribute 2',
      },
      defaultValue: true,
    }),
    input({
      key: EViewKey.Value_2_Name,
      label: {
        ru: 'Наименование Показателя 2',
        en: 'Name of Indicator 2',
      },
      defaultValue: 'Предыдущий год',
    }),
    //
    getHR(getBlockLabel('Изменение', 'Change')),
    //
    checkbox({
      key: EViewKey.IsChange,
      label: {
        ru: 'Выводить Изменение',
        en: 'Output Change',
      },
      defaultValue: true,
    }),
    input({
      key: EViewKey.ChangeName,
      label: {
        ru: 'Наименование Изменения',
        en: 'Name of Change',
      },
      defaultValue: 'Изменение',
    }),
    input({
      key: EViewKey.ChangeFormula,
      label: {
        ru: 'Формула Изменение',
        en: 'Formula Change',
      },
      defaultValue: `${columnsByBlock[EBlockKey.VALUE_1][0].name} - ${
        columnsByBlock[EBlockKey.VALUE_2][0].name
      }`,
    }),
    colorPicker({
      key: EViewKey.ChangeColorMax,
      label: {
        ru: `Цвет значения Изменение (Наибольшее число)`,
        en: `Value Color Change (Highest Number)`,
      },
      defaultValue: 'green',
    }),
    input({
      key: EViewKey.ChangeColorThr,
      label: {
        ru: `Формула (Наибольшее число > Порог > Наименьшее число) значения Изменение`,
        en: `Formula (Highest number > Threshold > Lowest number) value Change`,
      },
      defaultValue: '100 > 50 > 0',
    }),
    colorPicker({
      key: EViewKey.ChangeColorMin,
      label: {
        ru: `Цвет значения Изменение (Наименьшее число)`,
        en: `Value Color Change (Least Number)`,
      },
      defaultValue: 'red',
    }),
    //
    getHR(getBlockLabel('Исполнение', 'Execution')),
    //
    checkbox({
      key: EViewKey.IsExecution,
      label: {
        ru: 'Выводить Исполнение',
        en: 'Output Execution',
      },
      defaultValue: true,
    }),
    input({
      key: EViewKey.ExecutionName,
      label: {
        ru: 'Наименование Исполнение',
        en: 'Name of Execution',
      },
      defaultValue: 'Исполнение',
    }),
    input({
      key: EViewKey.ExecutionFormula,
      label: {
        ru: 'Формула Исполнение',
        en: 'Formula Execution',
      },
      defaultValue: `${columnsByBlock[EBlockKey.VALUE_1][0].name} / ${
        columnsByBlock[EBlockKey.VALUE_2][0].name
      } * 100`,
    }),
    colorPicker({
      key: EViewKey.ExecutionColorMax,
      label: {
        ru: `Цвет значения Исполнение (Наибольшее число)`,
        en: `Value Color Execution (Highest Number)`,
      },
      defaultValue: 'green',
    }),
    input({
      key: EViewKey.ExecutionColorThr,
      label: {
        ru: `Формула (Наибольшее число > Порог > Наименьшее число) значения Исполнение`,
        en: `Formula (Highest number > Threshold > Lowest number) value Execution`,
      },
      defaultValue: '100 > 50 > 0',
    }),
    colorPicker({
      key: EViewKey.ExecutionColorMin,
      label: {
        ru: `Цвет значения Исполнение (Наименьшее число)`,
        en: `Value Color Execution (Least Number)`,
      },
      defaultValue: 'red',
    }),
    //
    getHR(getBlockLabel('Темп прироста', 'Rate of increase')),
    //
    checkbox({
      key: EViewKey.IsRateOfIncrease,
      label: {
        ru: 'Выводить Темп прироста',
        en: 'Output Rate Of Increase',
      },
      defaultValue: true,
    }),
    input({
      key: EViewKey.RateOfIncreaseName,
      label: {
        ru: 'Наименование Темп прироста',
        en: 'Name of Rate Of Increase',
      },
      defaultValue: 'Темп прироста',
    }),
    input({
      key: EViewKey.RateOfIncreaseFormula,
      label: {
        ru: 'Формула Темп прироста',
        en: 'Formula Rate Of Increase',
      },
      defaultValue: `${columnsByBlock[EBlockKey.VALUE_1][0].name} / ${
        columnsByBlock[EBlockKey.VALUE_2][0].name
      } * 100 - 100`,
    }),
    colorPicker({
      key: EViewKey.RateOfIncreaseColorMax,
      label: {
        ru: `Цвет значения Темп прироста (Наибольшее число)`,
        en: `Value Color RateOfIncrease (Highest Number)`,
      },
      defaultValue: 'green',
    }),
    input({
      key: EViewKey.RateOfIncreaseColorThr,
      label: {
        ru: `Формула (Наибольшее число > Порог > Наименьшее число) значения Темп прироста`,
        en: `Formula (Highest number > Threshold > Lowest number) value RateOfIncrease`,
      },
      defaultValue: '10 > 5 > 0',
    }),
    colorPicker({
      key: EViewKey.RateOfIncreaseColorMin,
      label: {
        ru: `Цвет значения Темп прироста (Наименьшее число)`,
        en: `Value Color RateOfIncrease (Least Number)`,
      },
      defaultValue: 'red',
    }),
  ];
};

export const validation: ViewSettingsValidation = {};
