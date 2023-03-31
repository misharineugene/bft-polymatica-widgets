// types
import { TooltipEViewKey } from './tooltip.types';

export const triggerOn = [
  ['mouseover', 'Наведение мыши', 'Mouse move'],
  ['click', 'Клик', 'Click'],
];

export const replaceTpls = (
  item: { name: string; value: string },
  index: number,
  arrTpls: string[],
): string => {
  const { name, value } = item;
  let str = arrTpls[index];
  //
  str = str.replace(/\{name\}/gi, name);
  str = str.replace(/\{value\}/gi, value);

  str = '<div class="tooltip-line">' + str + '</div>';

  return str;
};

export const replaceTplsStr = (
  str: string,
  values: { name: string; value: string }[],
): string => {
  values.forEach((valItem, valIndex) => {
    const { name, value } = valItem;
    const regExpName = new RegExp(`\\{value\\[${name}\\]\\}`, 'gi');
    const regExpIndex = new RegExp(`\\{value\\[${valIndex}\\]\\}`, 'gi');
    str = str.replace(regExpName, value);
    str = str.replace(regExpIndex, value);
  });

  str = str.replace(/<\/p><p>/gi, '<br />');
  str = str.replace('<p>', '');
  str = str.replace('</p>', '');

  return str;
};

export const getSettings = (settings) => {
  return {
    show: settings[TooltipEViewKey.Show],
    //
    triggerOn: settings[TooltipEViewKey.TriggerOn],
    //
    content:
      settings[TooltipEViewKey.Content] ||
      '<p>{loop}<strong>{name}</strong>: {value}{/loop}</p>',
  };
};
