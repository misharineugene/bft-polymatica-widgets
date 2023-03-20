// consts
import { getSettings as getTitleSettings } from '../title/title.consts';
import {
  getSettings as getLegendSettings,
  legendIndent,
} from '../legend/legend.consts';
import { getLegendHeight } from '../legend/legend.consts';
import { getTitleHeight, titleIndent } from '../title/title.consts';
import {
  getSettings as getDataZoomSettings,
  dataZoomIndent,
} from '../dataZoom/dataZoom.consts';
import {
  getSettings as getXAxisSettings,
  getXAxisHeight,
  xAxisIndent,
} from '../xAxis/xAxis.consts';
// utils
import { addMarginByHeight } from '../../utils/setMargin';
// types
import { marginType } from '../../types';
import { GridEViewKey } from './grid.types';

export const gridIndent = { vm: 60, hm: '10%' };

export const getGridMargin = (settings, seriesNames) => {
  let {
    left,
    top,
    right,
    bottom,
    //
    titleShow,
    titleText,
    titleTop,
    //
    legendShow,
    legendTop,
    //
    dataZoomShow,
    dataZoomTop,
    //
    xAxisShow,
    xAxisTop,
  } = settings;
  const indent = gridIndent;

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
    margin.left = indent.hm;
    margin.right = indent.hm;

    if (titleShow) {
      addMarginByHeight({
        dir: titleTop,
        margin,
        height: getTitleHeight(settings),
        add: titleIndent.vm * 2,
      });
    }

    if (legendShow) {
      addMarginByHeight({
        dir: legendTop,
        margin,
        height: getLegendHeight(settings, seriesNames),
        add: legendIndent.vm * 2 - legendIndent.vp * 2,
      });
    }

    if (dataZoomShow) {
      addMarginByHeight({
        dir: dataZoomTop,
        margin,
        height: 36, // todo
        add: dataZoomIndent.vm * 2 - dataZoomIndent.vp * 2,
      });
    }

    if (xAxisShow) {
      addMarginByHeight({
        dir: xAxisTop,
        margin,
        height: getXAxisHeight(settings, seriesNames),
      });
    }

    const titleOn = titleShow && titleText;

    if (
      (titleOn && legendShow && titleTop === legendTop) ||
      (titleOn && dataZoomShow && titleTop === dataZoomTop)
    ) {
      margin[titleTop] -= titleIndent.vp * 4;
    }

    if (legendShow && dataZoomShow && legendTop === dataZoomTop) {
      margin[legendTop] -= legendIndent.vp * 4;
    }

    if (
      (xAxisShow && titleOn && xAxisTop === titleTop) ||
      (xAxisShow && legendShow && xAxisTop === legendTop) ||
      (xAxisShow && dataZoomShow && xAxisTop === dataZoomTop)
    ) {
      margin[xAxisTop] -= xAxisIndent.vp;
    }

    margin.top = margin.top < 60 ? 60 : margin.top;
    margin.bottom = margin.bottom < 60 ? 60 : margin.bottom;
  }

  return margin;
};

export const getSettings = (settings) => {
  const titleSettings = getTitleSettings(settings);
  const legendSettings = getLegendSettings(settings);
  const dataZoomSettings = getDataZoomSettings(settings);
  const xAxisSettings = getXAxisSettings(settings);

  return {
    show: settings[GridEViewKey.Show],
    //
    left: settings[GridEViewKey.Left] || 'auto',
    top: settings[GridEViewKey.Top] || 'auto',
    right: settings[GridEViewKey.Right] || 'auto',
    bottom: settings[GridEViewKey.Bottom] || 'auto',
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
    // dataZoom
    dataZoomShow: dataZoomSettings.show,
    dataZoomTop: dataZoomSettings.top,
    // xAxis
    xAxisShow: xAxisSettings.show,
    xAxisTop: xAxisSettings.position,
    xAxisRotate: xAxisSettings.rotate,
    xAxisFontSize: xAxisSettings.fontSize,
    xAxisLineHeight: xAxisSettings.lineHeight,
  };
};
