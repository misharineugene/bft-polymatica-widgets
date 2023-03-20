// utils
import { replaceN } from '../../utils/replaceN';
import { setMargin } from '../../utils/setMargin';
import { richToOption } from '../../utils/richToOption';
// types
import { marginType } from '../../types';
import { TitleEViewKey } from './title.types';

export const target = [
  ['self', 'В этой вкладке', 'In this tab'],
  ['blank', 'В новой вкладке', 'In a new tab'],
];

export const titleIndent = { vm: 15, hm: '10%', vp: 5 };

export const getTitleMargin = (settings) => {
  const { left, top, right, bottom } = settings;

  const indent = titleIndent;

  const margin: marginType = {
    top: 0,
    bottom: 0,
    //
    left: 0,
    right: 0,
  };

  if (
    !isNaN(parseInt(left)) ||
    !isNaN(parseInt(top)) ||
    !isNaN(parseInt(right)) ||
    !isNaN(parseInt(bottom))
  ) {
    Object.keys(margin).forEach((key) => (margin[key] = settings[key]));
  } else {
    setMargin({ top, left, margin, indent });
  }

  return margin;
};

export const getTitleHeight = (settings) => {
  const { titleText, titleLineHeight } = settings;

  if (titleText) {
    const countBr = JSON.stringify(titleText).split('\\n').length;

    return titleLineHeight * countBr + titleIndent.vp * 2;
  }

  return 0;
};

export const getSettings = (settings) => {
  const { text, rich } = richToOption({
    richStr: settings[TitleEViewKey.Rich],
    text: replaceN(settings[TitleEViewKey.Text]),
  });

  return {
    show: settings[TitleEViewKey.Show],
    //
    text,
    //
    link: settings[TitleEViewKey.Link],
    target: settings[TitleEViewKey.Target],
    //
    color: settings[TitleEViewKey.Color] || '#000',
    fontStyle: settings[TitleEViewKey.Italic] && !rich ? 'italic' : 'normal',
    fontWeight: settings[TitleEViewKey.Bold] && !rich ? 'bold' : 'normal',
    fontSize: !rich ? settings[TitleEViewKey.FontSize] || '12' : '12',
    lineHeight: !rich ? settings[TitleEViewKey.LineHeight] || '18' : '18',
    rich: rich || {},
    textAlign: !rich ? settings[TitleEViewKey.TextAlign] || 'left' : 'left',
    //
    left: settings[TitleEViewKey.Left] || 'center',
    top: settings[TitleEViewKey.Top] || 'top',
    right: settings[TitleEViewKey.Right] || 'auto',
    bottom: settings[TitleEViewKey.Bottom] || 'auto',
  };
};
