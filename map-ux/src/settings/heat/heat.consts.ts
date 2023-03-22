// types
import { HeatEViewKey } from './heat.types';

export const getSettings = (settings) => {
  return {
    show: settings[HeatEViewKey.Show],
    //
    path: settings[HeatEViewKey.Value],
    //
    radius: settings[HeatEViewKey.Radius] || '50',
  };
};
