import {
  input,
  select,
  checkbox,
  colorPicker,
} from 'ptnl-constructor-sdk/config';
// consts
import { textAlign, rotate, type } from './../../consts';
import { position } from './yAxis.consts';
// utils
import { getSelectItems } from '../../utils/getSelectItems';
// types
import { YAxisEViewKey } from './yAxis.types';

export const getYAxisSettings = () => {
  return [
    checkbox({
      key: YAxisEViewKey.Show,
      label: {
        ru: 'Показывать',
        en: 'Show',
      },
      defaultValue: true,
    }),
    /////////////////////////////////////
    input({
      key: YAxisEViewKey.Position,
      label: {
        ru: 'Расположение',
        en: 'Position',
      },
      defaultValue: position[0][0],
    }),
    select({
      key: YAxisEViewKey.Position,
      label: {
        ru: 'Расположение',
        en: 'Position',
      },
      options: position.map(getSelectItems),
      defaultValue: position[0][0],
    }),
    /////////////////////////////////////
    input({
      key: YAxisEViewKey.Type,
      label: {
        ru: 'Тип оси',
        en: 'Axis type',
      },
      defaultValue: type[0][0],
    }),
    select({
      key: YAxisEViewKey.Type,
      label: {
        ru: 'Тип оси',
        en: 'Axis type',
      },
      options: type.map(getSelectItems),
      defaultValue: type[0][0],
    }),
    /////////////////////////////////////
    input({
      key: YAxisEViewKey.Min,
      label: {
        ru: 'Минимальное значение (Для типа оси - значение)',
        en: 'Minimum value (For axis type - value)',
      },
      defaultValue: '',
    }),
    input({
      key: YAxisEViewKey.Max,
      label: {
        ru: 'Максимальное значение (Для типа оси - значение)',
        en: 'Maximum value (For axis type - value)',
      },
      defaultValue: '',
    }),
    /////////////////////////////////////
    input({
      key: YAxisEViewKey.LabelInterval,
      label: {
        ru: 'Интервал между значениями на оси',
        en: 'Interval between values on the axis',
      },
      defaultValue: 'auto',
    }),
    input({
      key: YAxisEViewKey.LabelRotate,
      label: {
        ru: 'Угол наклона значений на оси',
        en: 'The slope of the values on the axis',
      },
      defaultValue: rotate[0][0],
    }),
    select({
      key: YAxisEViewKey.LabelRotate,
      label: {
        ru: 'Угол наклона значений на оси',
        en: 'The slope of the values on the axis',
      },
      options: rotate.map(getSelectItems),
      defaultValue: rotate[0][0],
    }),
    /////////////////////////////////////
    input({
      key: YAxisEViewKey.LabelHtml,
      label: {
        ru: 'HTML',
        en: 'HTML',
      },
      defaultValue: '',
    }),
    input({
      key: YAxisEViewKey.LabelText,
      label: {
        ru: 'Текст',
        en: 'Text',
      },
      defaultValue: '{value}',
    }),
    input({
      key: YAxisEViewKey.LabelFontSize,
      label: {
        ru: 'Размер шрифта',
        en: 'FontSize',
      },
      defaultValue: '12',
    }),
    colorPicker({
      key: YAxisEViewKey.LabelColor,
      label: {
        ru: 'Цвет',
        en: 'Color',
      },
      defaultValue: '#000',
    }),
    checkbox({
      key: YAxisEViewKey.LabelBold,
      label: {
        ru: 'Жирный шрифт',
        en: 'Bold',
      },
      defaultValue: false,
    }),
    checkbox({
      key: YAxisEViewKey.LabelItalic,
      label: {
        ru: 'Курсив',
        en: 'Italic',
      },
      defaultValue: false,
    }),
    input({
      key: YAxisEViewKey.LabelLineHeight,
      label: {
        ru: 'Высота строки',
        en: 'Line Height',
      },
      defaultValue: '1',
    }),
    input({
      key: YAxisEViewKey.LabelTextAlign,
      label: {
        ru: 'Выравнивание текста',
        en: 'Text Align',
      },
      defaultValue: textAlign[2][0],
    }),
    select({
      key: YAxisEViewKey.LabelTextAlign,
      label: {
        ru: 'Выравнивание текста',
        en: 'Text Align',
      },
      options: textAlign.map(getSelectItems),
      defaultValue: textAlign[2][0],
    }),
    input({
      key: YAxisEViewKey.LabelRich,
      label: {
        ru: 'Шаблон',
        en: 'Template',
      },
      defaultValue: '',
    }),
  ];
};
