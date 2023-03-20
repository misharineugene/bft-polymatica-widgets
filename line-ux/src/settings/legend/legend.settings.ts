import {
  input,
  select,
  checkbox,
  colorPicker,
} from 'ptnl-constructor-sdk/config';
// consts
import { align, orient, iconType, legendType } from './legend.consts';
// utils
import { getSelectItems } from '../../utils/getSelectItems';
// types
import { LegendEViewKey } from './legend.types';

export const getLegendSettings = () => {
  return [
    checkbox({
      key: LegendEViewKey.Show,
      label: {
        ru: 'Показывать',
        en: 'Show',
      },
      defaultValue: true,
    }),
    /////////////////////////////////////
    input({
      key: LegendEViewKey.Type,
      label: {
        ru: 'Тип',
        en: 'Type',
      },
      defaultValue: legendType[0][0],
    }),
    select({
      key: LegendEViewKey.Type,
      label: {
        ru: 'Тип',
        en: 'Type',
      },
      options: legendType.map(getSelectItems),
      defaultValue: legendType[0][0],
    }),
    /////////////////////////////////////
    input({
      key: LegendEViewKey.Left,
      label: {
        ru: 'Отступ слева',
        en: 'Left margin',
      },
      defaultValue: 'center',
    }),
    input({
      key: LegendEViewKey.Top,
      label: {
        ru: 'Отступ сверху',
        en: 'Top margin',
      },
      defaultValue: 'bottom',
    }),
    input({
      key: LegendEViewKey.Right,
      label: {
        ru: 'Отступ справа',
        en: 'Right margin',
      },
      defaultValue: 'auto',
    }),
    input({
      key: LegendEViewKey.Bottom,
      label: {
        ru: 'Отступ снизу',
        en: 'Bottom margin',
      },
      defaultValue: 'auto',
    }),
    /////////////////////////////////////
    input({
      key: LegendEViewKey.Width,
      label: {
        ru: 'Ширина',
        en: 'Width',
      },
      defaultValue: 'auto',
    }),
    input({
      key: LegendEViewKey.Height,
      label: {
        ru: 'Высота',
        en: 'Height',
      },
      defaultValue: 'auto',
    }),
    input({
      key: LegendEViewKey.ItemGap,
      label: {
        ru: 'Отступ между элементами',
        en: 'Item gap',
      },
      defaultValue: '10',
    }),
    /////////////////////////////////////
    input({
      key: LegendEViewKey.Orient,
      label: {
        ru: 'Ориентация',
        en: 'Orient',
      },
      defaultValue: orient[0][0],
    }),
    select({
      key: LegendEViewKey.Orient,
      label: {
        ru: 'Ориентация',
        en: 'Orient',
      },
      options: orient.map(getSelectItems),
      defaultValue: orient[0][0],
    }),
    /////////////////////////////////////
    input({
      key: LegendEViewKey.Html,
      label: {
        ru: 'HTML',
        en: 'HTML',
      },
      defaultValue: '',
    }),
    input({
      key: LegendEViewKey.Text,
      label: {
        ru: 'Текст',
        en: 'Text',
      },
      defaultValue: '{name}',
    }),
    input({
      key: LegendEViewKey.FontSize,
      label: {
        ru: 'Размер шрифта',
        en: 'FontSize',
      },
      defaultValue: '12',
    }),
    colorPicker({
      key: LegendEViewKey.Color,
      label: {
        ru: 'Цвет',
        en: 'Color',
      },
      defaultValue: '#000',
    }),
    checkbox({
      key: LegendEViewKey.Bold,
      label: {
        ru: 'Жирный шрифт',
        en: 'Bold',
      },
      defaultValue: false,
    }),
    checkbox({
      key: LegendEViewKey.Italic,
      label: {
        ru: 'Курсив',
        en: 'Italic',
      },
      defaultValue: false,
    }),
    input({
      key: LegendEViewKey.LineHeight,
      label: {
        ru: 'Высота строки',
        en: 'Line Height',
      },
      defaultValue: '18',
    }),
    input({
      key: LegendEViewKey.TextAlign,
      label: {
        ru: 'Выравнивание текста',
        en: 'Text Align',
      },
      defaultValue: align[0][0],
    }),
    select({
      key: LegendEViewKey.TextAlign,
      label: {
        ru: 'Выравнивание текста',
        en: 'Text Align',
      },
      options: align.map(getSelectItems),
      defaultValue: align[0][0],
    }),
    input({
      key: LegendEViewKey.Rich,
      label: {
        ru: 'Шаблон',
        en: 'Template',
      },
      defaultValue: '',
    }),
    /////////////////////////////////////
    input({
      key: LegendEViewKey.IconType,
      label: {
        ru: 'Иконка',
        en: 'Icon',
      },
      defaultValue: iconType[0][0],
    }),
    select({
      key: LegendEViewKey.IconType,
      label: {
        ru: 'Иконка',
        en: 'Icon',
      },
      options: iconType.map(getSelectItems),
      defaultValue: iconType[0][0],
    }),
  ];
};
