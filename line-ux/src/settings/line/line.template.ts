// consts
import { getSettings } from './line.consts';
// types
import { LineType } from './line.types';

export function getLineTpl(settings, dataConfig): LineType[] {
  const settingsObj = getSettings(settings);
  //
  const {
    colorBy,
    //
    stack,
    //
    type,
    //
    area,
    opacity,
    gradient,
  } = settingsObj;

  const lineTpl = {
    type: 'line',
    //
    colorBy,
    //
    ...(stack && {
      stack: 'lineStack',
    }),
    //
    ...(type === 'step' && {
      step: 'start',
    }),
    ...(type === 'smooth' && {
      smooth: true,
    }),
    //
    ...(area && {
      areaStyle: {
        opacity,
        ...(gradient && {
          color: '#000',
        }),
      },
    }),
  };

  const { xPath, yPaths, sPath, sItems, yItems } = dataConfig;

  const result = [];

  if (sItems.length) {
    sItems.forEach((sItem, sIndex) => {
      yItems.forEach((yItem, yIndex) => {
        result.push({
          name: yItems.length > 1 ? sItem + ' - ' + yItem : sItem,
          encode: { x: xPath, y: yPaths[yIndex] },
          datasetIndex: sIndex + 1,
          ...lineTpl,
        });
      });
    });
  } else {
    yItems.forEach((yItem, yIndex) => {
      result.push({
        name: yItem,
        encode: { x: xPath, y: yPaths[yIndex] },
        datasetIndex: 0,
        ...lineTpl,
      });
    });
  }

  return result;
}
