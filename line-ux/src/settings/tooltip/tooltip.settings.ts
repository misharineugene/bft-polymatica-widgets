import {
  input,
  select,
  checkbox,
  colorPicker,
} from 'ptnl-constructor-sdk/config';
// consts
import { textAlign } from './../../consts';
import { trigger, triggerOn } from './tooltip.consts';
// utils
import { getSelectItems } from '../../utils/getSelectItems';
// types
import { TooltipEViewKey } from './tooltip.types';

export const getTooltipSettings = () => {
  return [
    checkbox({
      key: TooltipEViewKey.Show,
      label: {
        ru: 'Показывать',
        en: 'Show',
      },
      defaultValue: true,
    }),
    /////////////////////////////////////
    select({
      key: TooltipEViewKey.Trigger,
      label: {
        ru: 'Тип срабатывания',
        en: 'Type of triggering',
      },
      options: trigger.map(getSelectItems),
      defaultValue: trigger[0][0],
    }),
    input({
      key: TooltipEViewKey.Trigger,
      label: {
        ru: 'Тип срабатывания',
        en: 'Type of triggering',
      },
      defaultValue: trigger[0][0],
    }),
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
    /////////////////////////////////////
    input({
      key: TooltipEViewKey.Html,
      label: {
        ru: 'HTML',
        en: 'HTML',
      },
      defaultValue: '',
    }),
    input({
      key: TooltipEViewKey.Text,
      label: {
        ru: 'Текст',
        en: 'Text',
      },
      defaultValue: '{value}',
    }),
    input({
      key: TooltipEViewKey.FontSize,
      label: {
        ru: 'Размер шрифта',
        en: 'FontSize',
      },
      defaultValue: '12',
    }),
    colorPicker({
      key: TooltipEViewKey.Color,
      label: {
        ru: 'Цвет',
        en: 'Color',
      },
      defaultValue: '#000',
    }),
    checkbox({
      key: TooltipEViewKey.Bold,
      label: {
        ru: 'Жирный шрифт',
        en: 'Bold',
      },
      defaultValue: false,
    }),
    checkbox({
      key: TooltipEViewKey.Italic,
      label: {
        ru: 'Курсив',
        en: 'Italic',
      },
      defaultValue: false,
    }),
    input({
      key: TooltipEViewKey.LineHeight,
      label: {
        ru: 'Высота строки',
        en: 'Line Height',
      },
      defaultValue: '18',
    }),
    select({
      key: TooltipEViewKey.TextAlign,
      label: {
        ru: 'Выравнивание текста',
        en: 'Text Align',
      },
      options: textAlign.map(getSelectItems),
      defaultValue: textAlign[0][0],
    }),
    input({
      key: TooltipEViewKey.TextAlign,
      label: {
        ru: 'Выравнивание текста',
        en: 'Text Align',
      },
      defaultValue: textAlign[0][0],
    }),
    input({
      key: TooltipEViewKey.Rich,
      label: {
        ru: 'Шаблон',
        en: 'Template',
      },
      defaultValue: '',
    }),
  ];
};
