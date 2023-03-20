// consts
import { getSettings as getTitleSettings } from '../title/title.consts';
import { getSettings as getLegendSettings } from '../legend/legend.consts';
import { getLegendHeight } from '../legend/legend.consts';
import { getTitleHeight, titleIndent } from '../title/title.consts';
// utils
import { addMarginByHeight, setMargin } from '../../utils/setMargin';
// types
import { marginType } from '../../types';
import { DataZoomEViewKey } from './dataZoom.types';

export const dataZoomIndent = { vm: 20, hm: '10%', vp: 0 }; // todo

export const getDataZoomMargin = (settings, seriesNames) => {
  let { left, top, right, bottom, titleShow, titleTop, legendShow, legendTop } =
    settings;
  const indent = dataZoomIndent;

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
    if (top === 'top') {
      indent.vm = 20;
      indent.vp = 0;
    }
    if (top === 'bottom') {
      indent.vm = 26;
      indent.vp = 6;
    }

    setMargin({ top, left, margin, indent });

    if (titleShow && top === titleTop) {
      addMarginByHeight({
        dir: titleTop,
        margin,
        height: getTitleHeight(settings),
        add: titleIndent.vm - titleIndent.vp,
      });
    }

    if (legendShow && top === legendTop) {
      addMarginByHeight({
        dir: legendTop,
        margin,
        height: getLegendHeight(settings, seriesNames),
      });
    }
  }

  return margin;
};

export const getSettings = (settings) => {
  const titleSettings = getTitleSettings(settings);
  const legendSettings = getLegendSettings(settings);

  return {
    show: settings[DataZoomEViewKey.Show],
    //
    left: settings[DataZoomEViewKey.Left] || 'center',
    top: settings[DataZoomEViewKey.Top] || 'bottom',
    right: settings[DataZoomEViewKey.Right] || 'auto',
    bottom: settings[DataZoomEViewKey.Bottom] || 'auto',
    //
    inside: settings[DataZoomEViewKey.Inside],
    // title
    titleShow: titleSettings.show,
    titleTop: titleSettings.top,
    titleText: titleSettings.text,
    titleLineHeight: titleSettings.lineHeight,
    // legend
    legendShow: legendSettings.show,
    legendType: legendSettings.type,
    legendTop: legendSettings.top,
    legendOrient: legendSettings.orient,
    legendFontSize: legendSettings.fontSize,
    legendLineHeight: legendSettings.lineHeight,
    legendItemGap: legendSettings.itemGap,
    legendIcon: legendSettings.icon,
  };
};
