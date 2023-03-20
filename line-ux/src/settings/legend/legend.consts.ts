// consts
import {
  getSettings as getTitleSettings,
  getTitleHeight,
} from '../title/title.consts';
// utils
import { toInlineStyle } from '../../utils/toInlineStyle';
import {
  setMargin,
  addMarginByHeight,
  getStyles,
  getHeightByContent,
} from '../../utils/setMargin';
import { richToOption } from '../../utils/richToOption';
// types
import { marginType } from '../../types';
import { LegendEViewKey } from './legend.types';

export const legendType = [
  ['plain', 'Простой', 'Plain'],
  ['scroll', 'Прокручиваемый', 'Scroll'],
];

export const iconType = [
  ['auto', 'Авто', 'Auto'],
  ['circle', 'Круг', 'Circle'],
  ['rect', 'Прямоугольник', 'Rect'],
  ['roundRect', 'Закругленный прямоугольник', 'RoundRect'],
  ['triangle', 'Треугольник', 'Triangle'],
  ['diamond', 'Бриллиант', 'Diamond'],
  ['none', 'Ничего', 'None'],
];

export const orient = [
  ['horizontal', 'Горизонтальная', 'Horizontal'],
  ['vertical', 'Вертикальная', 'Vertical'],
];

export const align = [
  ['left', 'Слева', 'Left'],
  ['right', 'Справа', 'Right'],
];

export const legendIndent = { vm: 15, hm: '5%', vp: 5 };

export const getLegendMargin = (settings) => {
  const { left, top, right, bottom, titleShow, titleTop } = settings;
  const indent = legendIndent;

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

    if (titleShow && top === titleTop) {
      addMarginByHeight({
        dir: titleTop,
        margin,
        height: getTitleHeight(settings),
        add: indent.vm - indent.vp,
      });
    }
  }

  return margin;
};

export const getLegendHeight = (settings, seriesNames) => {
  const { legend: styles } = getStyles(settings);

  const content = seriesNames
    .map((name) => {
      return `<div style="${toInlineStyle(
        styles.item,
      )}"><span style="${toInlineStyle(styles.mark)}"></span>${name}</div>`;
    })
    .join('');

  return getHeightByContent(content, styles);
};

export const getSettings = (settings) => {
  const { text, rich } = richToOption({
    richStr: settings[LegendEViewKey.Rich],
    text: settings[LegendEViewKey.Text],
  });
  //
  const titleSettings = getTitleSettings(settings);

  return {
    show: settings[LegendEViewKey.Show],
    //
    type: settings[LegendEViewKey.Type],
    //
    left: settings[LegendEViewKey.Left] || 'center',
    top: settings[LegendEViewKey.Top] || 'bottom',
    right: settings[LegendEViewKey.Right] || 'auto',
    bottom: settings[LegendEViewKey.Bottom] || 'auto',
    //
    width: settings[LegendEViewKey.Width] || 'auto',
    height: settings[LegendEViewKey.Height] || 'auto',
    itemGap: settings[LegendEViewKey.ItemGap] || '10',
    //
    align: settings[LegendEViewKey.TextAlign],
    //
    orient: settings[LegendEViewKey.Orient],
    //
    formatter: text,
    //
    color: settings[LegendEViewKey.Color] || '#000',
    fontStyle: settings[LegendEViewKey.Italic] && !rich ? 'italic' : 'normal',
    fontWeight: settings[LegendEViewKey.Bold] && !rich ? 'bold' : 'normal',
    fontSize: !rich ? settings[LegendEViewKey.FontSize] || '12' : '12',
    lineHeight: !rich ? settings[LegendEViewKey.LineHeight] || '18' : '18',
    rich: rich || {},
    //
    icon: settings[LegendEViewKey.IconType],
    // title
    titleShow: titleSettings.show,
    titleTop: titleSettings.top,
    titleText: titleSettings.text,
    titleLineHeight: titleSettings.lineHeight,
  };
};
