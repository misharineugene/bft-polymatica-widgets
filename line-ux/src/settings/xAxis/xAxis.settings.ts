import {
  input,
  select,
  checkbox,
  colorPicker,
} from 'ptnl-constructor-sdk/config';
// consts
import { textAlign, rotate, type } from './../../consts';
import { position } from './xAxis.consts';
// utils
import { getSelectItems } from '../../utils/getSelectItems';
// types
import { XAxisEViewKey } from './xAxis.types';

export const getXAxisSettings = () => {
  return [
    checkbox({
      key: XAxisEViewKey.Show,
      label: {
        ru: 'Показывать',
        en: 'Show',
      },
      defaultValue: true,
    }),
    /////////////////////////////////////
    select({
      key: XAxisEViewKey.Position,
      label: {
        ru: 'Расположение',
        en: 'Position',
      },
      options: position.map(getSelectItems),
      defaultValue: position[1][0],
    }),
    input({
      key: XAxisEViewKey.Position,
      label: {
        ru: 'Расположение',
        en: 'Position',
      },
      defaultValue: position[1][0],
    }),
    /////////////////////////////////////
    select({
      key: XAxisEViewKey.Type,
      label: {
        ru: 'Тип оси',
        en: 'Axis type',
      },
      options: type.map(getSelectItems),
      defaultValue: type[1][0],
    }),
    input({
      key: XAxisEViewKey.Type,
      label: {
        ru: 'Тип оси',
        en: 'Axis type',
      },
      defaultValue: type[1][0],
    }),
    /////////////////////////////////////
    checkbox({
      key: XAxisEViewKey.Inverse,
      label: {
        ru: 'Инвертировать',
        en: 'Inverse',
      },
      defaultValue: false,
    }),
    /////////////////////////////////////
    input({
      key: XAxisEViewKey.Min,
      label: {
        ru: 'Минимальное значение (Для типа оси - значение)',
        en: 'Minimum value (For axis type - value)',
      },
      defaultValue: '',
    }),
    input({
      key: XAxisEViewKey.Max,
      label: {
        ru: 'Максимальное значение (Для типа оси - значение)',
        en: 'Maximum value (For axis type - value)',
      },
      defaultValue: '',
    }),
    /////////////////////////////////////
    input({
      key: XAxisEViewKey.LabelInterval,
      label: {
        ru: 'Интервал между значениями на оси',
        en: 'Interval between values on the axis',
      },
      defaultValue: 'auto',
    }),
    select({
      key: XAxisEViewKey.LabelRotate,
      label: {
        ru: 'Угол наклона значений на оси',
        en: 'The slope of the values on the axis',
      },
      options: rotate.map(getSelectItems),
      defaultValue: rotate[0][0],
    }),
    input({
      key: XAxisEViewKey.LabelRotate,
      label: {
        ru: 'Угол наклона значений на оси',
        en: 'The slope of the values on the axis',
      },
      defaultValue: rotate[0][0],
    }),
    /////////////////////////////////////
    input({
      key: XAxisEViewKey.LabelHtml,
      label: {
        ru: 'HTML',
        en: 'HTML',
      },
      defaultValue: '',
    }),
    input({
      key: XAxisEViewKey.LabelText,
      label: {
        ru: 'Текст',
        en: 'Text',
      },
      defaultValue: '{value}',
    }),
    input({
      key: XAxisEViewKey.LabelFontSize,
      label: {
        ru: 'Размер шрифта',
        en: 'FontSize',
      },
      defaultValue: '12',
    }),
    colorPicker({
      key: XAxisEViewKey.LabelColor,
      label: {
        ru: 'Цвет',
        en: 'Color',
      },
      defaultValue: '#000',
    }),
    checkbox({
      key: XAxisEViewKey.LabelBold,
      label: {
        ru: 'Жирный шрифт',
        en: 'Bold',
      },
      defaultValue: false,
    }),
    checkbox({
      key: XAxisEViewKey.LabelItalic,
      label: {
        ru: 'Курсив',
        en: 'Italic',
      },
      defaultValue: false,
    }),
    input({
      key: XAxisEViewKey.LabelLineHeight,
      label: {
        ru: 'Высота строки',
        en: 'Line Height',
      },
      defaultValue: '18',
    }),
    select({
      key: XAxisEViewKey.LabelTextAlign,
      label: {
        ru: 'Выравнивание текста',
        en: 'Text Align',
      },
      options: textAlign.map(getSelectItems),
      defaultValue: textAlign[1][0],
    }),
    input({
      key: XAxisEViewKey.LabelTextAlign,
      label: {
        ru: 'Выравнивание текста',
        en: 'Text Align',
      },
      defaultValue: textAlign[1][0],
    }),
    input({
      key: XAxisEViewKey.LabelRich,
      label: {
        ru: 'Шаблон',
        en: 'Template',
      },
      defaultValue: '',
    }),
  ];
};
