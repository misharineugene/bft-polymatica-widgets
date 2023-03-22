import { checkbox, input } from 'ptnl-constructor-sdk/config';
// types
import { ClusterEViewKey } from './cluster.types';

export const getClusterSettings = () => {
  return [
    checkbox({
      key: ClusterEViewKey.Show,
      label: {
        ru: 'Объединить метки в группы',
        en: 'Combine markers into groups',
      },
      defaultValue: false,
    }),
    //
    input({
      key: ClusterEViewKey.Radius,
      label: {
        ru: 'Радиус для объединения',
        en: 'Radius to merge',
      },
      defaultValue: '80',
    }),
  ];
};
