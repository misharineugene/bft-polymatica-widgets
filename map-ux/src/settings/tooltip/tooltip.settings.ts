import {
  input,
  checkbox,
  select,
  colorPicker,
} from 'ptnl-constructor-sdk/config';
import { textAlign } from '../../consts';
// utils
import { getSelectItems } from '../../utils/getSelectItems';
// consts
import { triggerOn } from './tooltip.consts';
// types
import { TooltipEViewKey } from './tooltip.types';

export const getTooltipSettings = () => {
  return [
    checkbox({
      key: TooltipEViewKey.Show,
      label: {
        ru: 'Включить',
        en: 'Turn on',
      },
      defaultValue: true,
    }),
    //
    select({
      key: TooltipEViewKey.TriggerOn,
      label: {
        ru: 'Условие срабатывания',
        en: 'Conditions to trigger',
      },
      options: triggerOn.map(getSelectItems),
      defaultValue: triggerOn[0][0],
    }),
    input({
      key: TooltipEViewKey.TriggerOn,
      label: {
        ru: 'Условие срабатывания',
        en: 'Conditions to trigger',
      },
      defaultValue: triggerOn[0][0],
    }),
    //
    input({
      key: TooltipEViewKey.Content,
      label: {
        ru: 'Контент внутри подсказки',
        en: 'Content inside tooltip',
      },
      defaultValue: '<p>{loop}<strong>{name}</strong>: {value}{/loop}</p>',
    }),
    input({
      key: TooltipEViewKey.ContentText,
      label: {
        ru: 'Контент',
        en: 'Content',
      },
      defaultValue: '',
    }),
    input({
      key: TooltipEViewKey.ContentFontSize,
      label: {
        ru: 'Размер шрифта',
        en: 'FontSize',
      },
      defaultValue: '14',
    }),
    colorPicker({
      key: TooltipEViewKey.ContentColor,
      label: {
        ru: 'Цвет',
        en: 'Color',
      },
      defaultValue: '#000',
    }),
    checkbox({
      key: TooltipEViewKey.ContentBold,
      label: {
        ru: 'Жирный шрифт',
        en: 'Bold',
      },
      defaultValue: false,
    }),
    checkbox({
      key: TooltipEViewKey.ContentItalic,
      label: {
        ru: 'Курсив',
        en: 'Italic',
      },
      defaultValue: false,
    }),
    input({
      key: TooltipEViewKey.ContentLineHeight,
      label: {
        ru: 'Высота строки',
        en: 'Line Height',
      },
      defaultValue: '1.7',
    }),
    input({
      key: TooltipEViewKey.ContentTextAlign,
      label: {
        ru: 'Выравнивание текста',
        en: 'Text Align',
      },
      defaultValue: textAlign[0][0],
    }),
    select({
      key: TooltipEViewKey.ContentTextAlign,
      label: {
        ru: 'Выравнивание текста',
        en: 'Text Align',
      },
      options: textAlign.map(getSelectItems),
      defaultValue: textAlign[0][0],
    }),
    input({
      key: TooltipEViewKey.ContentRich,
      label: {
        ru: 'Шаблон',
        en: 'Template',
      },
      defaultValue: '',
    }),
  ];
};
