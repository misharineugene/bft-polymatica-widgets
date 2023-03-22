// types
import { MapEViewKey } from './map.types';

export const getSettings = (settings) => {
  return {
    center: settings[MapEViewKey.Center] || '66.25, 94.15',
    zoom: settings[MapEViewKey.Zoom] || '3',
    //
    mask: settings[MapEViewKey.Mask],
    maskOpacity: settings[MapEViewKey.MaskOpacity] || '1',
  };
};
