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
  const getNewValues = (count) => {
    const newVals = new Array(count).fill([]);
    //
    for (let i = 0; i < count; i++) {
      const index = i + 1;
      //
      newVals[i] = [
        getHR(getBlockLabel(`Вычисляемый показатель (${index})`, 'Change')),
        //
        checkbox({
          key: EViewKey[`IsNewValue_${i}`],
          label: {
            ru: 'Скрытый',
            en: 'Hidden',
          },
          defaultValue: false,
        }),
        input({
          key: EViewKey[`NewValueName_${i}`],
          label: {
            ru: 'Наименование',
            en: 'Name',
          },
          defaultValue: `Наименование ${index}`,
        }),
        input({
          key: EViewKey[`NewValuePrefixPostfix_${i}`],
          label: {
            ru: 'Префикс и постфикс к значению (Префикс|Постфикс)',
            en: 'Prefix and postfix to value (Prefix|Postfix)',
          },
          defaultValue: '',
        }),
        input({
          key: EViewKey[`NewValueFontSize_${i}`],
          label: {
            ru: 'Размер шрифта',
            en: 'FontSize',
          },
          defaultValue: '16',
        }),
        input({
          key: EViewKey[`NewValueFormula_${i}`],
          label: {
            ru: 'Формула',
            en: 'Formula',
          },
          defaultValue: '',
        }),
        colorPicker({
          key: EViewKey[`NewValueColorMax_${i}`],
          label: {
            ru: `Цвет значения (Наибольшее число)`,
            en: `Value Color (Highest Number)`,
          },
          defaultValue: 'green',
        }),
        input({
          key: EViewKey[`NewValueColorThr_${i}`],
          label: {
            ru: `Формула (Наибольшее число > Порог > Наименьшее число) значения`,
            en: `Formula (Highest number > Threshold > Lowest number) value`,
          },
          defaultValue: '100 > 50 > 0',
        }),
        colorPicker({
          key: EViewKey[`NewValueColorMin_${i}`],
          label: {
            ru: `Цвет значения (Наименьшее число)`,
            en: `Value Color (Least Number)`,
          },
          defaultValue: 'red',
        }),
      ];
    }

    return newVals.flat();
  };

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
    getHR(getBlockLabel('Показатель 1', 'Indicator 1')),
    //
    checkbox({
      key: EViewKey.IsValue_1,
      label: {
        ru: 'Скрытый',
        en: 'Hidden',
      },
      defaultValue: false,
    }),
    //
    checkbox({
      key: EViewKey.IsValue_1_Name,
      label: {
        ru: '"Свое" наименование',
        en: '"Own" Title',
      },
      defaultValue: false,
    }),
    input({
      key: EViewKey.Value_1_Name,
      label: {
        ru: 'Наименование Показателя 1',
        en: 'Name of Indicator 1',
      },
      defaultValue: 'Показатель 1',
    }),
    input({
      key: EViewKey.Value_1_PrefixPostfix,
      label: {
        ru: 'Префикс и постфикс к значению (Префикс|Постфикс)',
        en: 'Prefix and postfix to value (Prefix|Postfix)',
      },
      defaultValue: '',
    }),
    input({
      key: EViewKey.Value_1_FontSize,
      label: {
        ru: 'Размер шрифта',
        en: 'FontSize',
      },
      defaultValue: '16',
    }),
    //
    getHR(getBlockLabel('Показатель 2', 'Indicator 2')),
    //
    checkbox({
      key: EViewKey.IsValue_2,
      label: {
        ru: 'Скрытый',
        en: 'Hidden',
      },
      defaultValue: false,
    }),
    //
    checkbox({
      key: EViewKey.IsValue_2_Name,
      label: {
        ru: '"Свое" наименование',
        en: '"Own" Title',
      },
      defaultValue: false,
    }),
    input({
      key: EViewKey.Value_2_Name,
      label: {
        ru: 'Наименование Показателя 2',
        en: 'Name of Indicator 2',
      },
      defaultValue: 'Показатель 2',
    }),
    input({
      key: EViewKey.Value_2_PrefixPostfix,
      label: {
        ru: 'Префикс и постфикс к значению (Префикс|Постфикс)',
        en: 'Prefix and postfix to value (Prefix|Postfix)',
      },
      defaultValue: '',
    }),
    input({
      key: EViewKey.Value_2_FontSize,
      label: {
        ru: 'Размер шрифта',
        en: 'FontSize',
      },
      defaultValue: '16',
    }),
    //
    ...getNewValues(3),
  ];
};

export const validation: ViewSettingsValidation = {};
