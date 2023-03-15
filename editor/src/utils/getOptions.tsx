import { optionType } from "../types";

export const getOptions = (options: optionType[], lang: 'ru' | 'en') => {
  return options.map((item) => {
    return {
      ...item,
      label: item.label[lang],
    };
  });
};