// types
import { ClusterEViewKey } from './cluster.types';

export const getSettings = (settings) => {
  return {
    show: settings[ClusterEViewKey.Show],
    //
    radius: settings[ClusterEViewKey.Radius] || '80',
  };
};
