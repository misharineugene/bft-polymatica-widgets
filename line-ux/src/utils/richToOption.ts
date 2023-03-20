import { RichToOptionType } from '../types';

export const richToOption = ({ richStr, text }: RichToOptionType) => {
  if (richStr) return JSON.parse(richStr);

  return {
    text,
    rich: null,
  };
};
