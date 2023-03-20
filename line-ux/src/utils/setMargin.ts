// consts
import { legendIndent } from '../settings/legend/legend.consts';
import { xAxisIndent } from '../settings/xAxis/xAxis.consts';
import { toInlineStyle } from './toInlineStyle';

export const setMargin = ({ top, left, margin, indent }) => {
  const { vm, hm } = indent;

  if (top === 'top') {
    margin.top = vm;
    margin.bottom = 'auto';
  } else if (top === 'bottom') {
    margin.top = 'auto';
    margin.bottom = vm;
  } else {
    margin.top = top;
    margin.bottom = 'auto';
  }

  if (left === 'left') {
    margin.left = hm;
    margin.right = 'auto';
  } else if (left === 'right') {
    margin.left = 'auto';
    margin.right = hm;
  } else {
    margin.left = left;
    margin.right = 'auto';
  }
};

export const addMarginByHeight = ({ dir, margin, height, add = 0 }) => {
  if (isNaN(Number(margin[dir]))) margin[dir] = 0;
  //
  margin[dir] += height;
  margin[dir] += add;
};

export const getStyles = (settings) => {
  const {
    legendType,
    legendOrient,
    legendFontSize,
    legendLineHeight,
    legendWidth,
    legendHeight,
    legendItemGap,
    legendIcon,
    //
    xAxisRotate,
    xAxisFontSize,
    xAxisLineHeight,
  } = settings;

  return {
    legend: {
      container: {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        display: 'flex',
        'flex-direction': legendOrient === 'vertical' ? 'column' : 'row',
        padding: legendIndent.vp + 'px 0',
        'margin-left': -(legendItemGap / 2) + legendIndent.vp + 'px',
        'margin-right': -(legendItemGap / 2) + legendIndent.vp + 'px',
        visibility: 'hidden',
        opacity: '0',
        'flex-wrap': legendType === 'plain' ? 'wrap' : 'nowrap',
        fontFamily: 'Arial',
        'font-size': legendFontSize + 'px',
        'line-height': legendLineHeight + 'px',
        //
        ...(legendWidth &&
          legendWidth !== 'auto' && {
            width: legendWidth + 'px',
          }),
        ...(legendHeight &&
          legendHeight !== 'auto' && {
            height: legendHeight + 'px',
          }),
      },
      item: {
        display: 'flex',
        margin: legendItemGap / 2 + 'px',
        'align-items': 'center',
      },
      mark: {
        display: 'inline-block',
        width: legendIcon === 'circle' ? '20px' : '25px',
        height: '14px',
        'margin-right': '5px',
      },
    },
    xAxis: {
      container: {
        position: 'absolute',
        top: '60px',
        padding: xAxisIndent.vp + 'px',
        visibility: 'hidden',
        opacity: '0',
        transform: `rotate(${xAxisRotate}deg)`,
        'font-size': xAxisFontSize + 'px',
        'line-height': xAxisLineHeight + 'px',
      },
    },
  };
};

export const getHeightByContent = (content, styles) => {
  const node = document.createElement('div');

  node.style.cssText = toInlineStyle(styles.container);
  node.innerHTML = content;

  document.body.append(node);
  const height = +node.getBoundingClientRect().height.toFixed(2);
  node.remove();

  return height;
};
