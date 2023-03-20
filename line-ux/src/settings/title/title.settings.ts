import {
  input,
  select,
  checkbox,
  colorPicker,
} from 'ptnl-constructor-sdk/config';
// consts
import { textAlign } from '../../consts';
import { target } from './title.consts';
// utils
import { getSelectItems } from '../../utils/getSelectItems';
// types
import { TitleEViewKey } from './title.types';

export const getTitleSettings = () => {
  return [
    checkbox({
      key: TitleEViewKey.Show,
      label: {
        ru: 'Показывать',
        en: 'Show',
      },
      defaultValue: true,
    }),
    input({
      key: TitleEViewKey.Html,
      label: {
        ru: 'HTML',
        en: 'HTML',
      },
      defaultValue: '',
    }),
    input({
      key: TitleEViewKey.Text,
      label: {
        ru: 'Текст',
        en: 'Text',
      },
      defaultValue: '',
    }),
    input({
      key: TitleEViewKey.FontSize,
      label: {
        ru: 'Размер шрифта',
        en: 'FontSize',
      },
      defaultValue: '12',
    }),
    colorPicker({
      key: TitleEViewKey.Color,
      label: {
        ru: 'Цвет',
        en: 'Color',
      },
      defaultValue: '#000',
    }),
    checkbox({
      key: TitleEViewKey.Bold,
      label: {
        ru: 'Жирный шрифт',
        en: 'Bold',
      },
      defaultValue: false,
    }),
    checkbox({
      key: TitleEViewKey.Italic,
      label: {
        ru: 'Курсив',
        en: 'Italic',
      },
      defaultValue: false,
    }),
    input({
      key: TitleEViewKey.LineHeight,
      label: {
        ru: 'Высота строки',
        en: 'Line Height',
      },
      defaultValue: '18',
    }),
    input({
      key: TitleEViewKey.TextAlign,
      label: {
        ru: 'Выравнивание текста',
        en: 'Text Align',
      },
      defaultValue: textAlign[0][0],
    }),
    select({
      key: TitleEViewKey.TextAlign,
      label: {
        ru: 'Выравнивание текста',
        en: 'Text Align',
      },
      options: textAlign.map(getSelectItems),
      defaultValue: textAlign[0][0],
    }),
    input({
      key: TitleEViewKey.Rich,
      label: {
        ru: 'Шаблон',
        en: 'Template',
      },
      defaultValue: '',
    }),
    /////////////////////////////////////
    input({
      key: TitleEViewKey.Link,
      label: {
        ru: 'Ссылка',
        en: 'Link',
      },
      defaultValue: '',
    }),
    input({
      key: TitleEViewKey.Target,
      label: {
        ru: 'Окрывать ссылку',
        en: 'Open link',
      },
      defaultValue: target[1][0],
    }),
    select({
      key: TitleEViewKey.Target,
      label: {
        ru: 'Окрывать ссылку',
        en: 'Open link',
      },
      options: target.map(getSelectItems),
      defaultValue: target[1][0],
    }),
    /////////////////////////////////////
    input({
      key: TitleEViewKey.Left,
      label: {
        ru: 'Отступ слева',
        en: 'Left margin',
      },
      defaultValue: 'center',
    }),
    input({
      key: TitleEViewKey.Top,
      label: {
        ru: 'Отступ сверху',
        en: 'Top margin',
      },
      defaultValue: 'top',
    }),
    input({
      key: TitleEViewKey.Right,
      label: {
        ru: 'Отступ справа',
        en: 'Right margin',
      },
      defaultValue: 'auto',
    }),
    input({
      key: TitleEViewKey.Bottom,
      label: {
        ru: 'Отступ снизу',
        en: 'Bottom margin',
      },
      defaultValue: 'auto',
    }),
  ];
};
