import { columnType } from '../types';

const regExp = new RegExp('{{.+}}', 'gi');

export const getValueByTpl = (
  column: columnType,
  tpl: number | string | boolean,
) => {
  tpl = String(tpl);

  if (regExp.test(tpl)) {
    const fieldKey = tpl.replace(/{{/gi, '').replace(/}}/gi, '').trim();

    //@ts-ignore
    return column[fieldKey];
  }

  return tpl;
};
