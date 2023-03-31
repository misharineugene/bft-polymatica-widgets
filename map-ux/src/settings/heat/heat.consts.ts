// types
import { HeatEViewKey } from './heat.types';

export const getSettings = (settings) => {
  return {
    show: settings[HeatEViewKey.Show],
    //
    valueH: settings[HeatEViewKey.ValueH] || '',
    //
    radius: settings[HeatEViewKey.Radius] || '50',
    //
    colorMin: settings[HeatEViewKey.ColorMin],
    colorAvg: settings[HeatEViewKey.ColorAvg],
    colorMax: settings[HeatEViewKey.ColorMax],
  };
};
