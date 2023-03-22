import {
  checkbox,
  CreateViewSettings,
  ViewSettingsValidation,
} from 'ptnl-constructor-sdk/config';
import { DataSettings, ViewSettings } from 'ptnl-constructor-sdk';
// enum
import { EViewKey } from './enum';
// utils
import { getGroupLabel } from './utils/getGroupLabel';
// settings
import { getMapSettings } from './settings/map/map.settings';
import { getClusterSettings } from './settings/cluster/cluster.settings';
import { getHeatSettings } from './settings/heat/heat.settings';
import { getTooltipSettings } from './settings/tooltip/tooltip.settings';

export const createViewSettings: CreateViewSettings<DataSettings> = ({
  dataSettings,
  viewSettings,
}: {
  dataSettings: DataSettings;
  viewSettings: ViewSettings;
}) => {
  return [
    // checkbox({
    //   key: EViewKey.CustomEditor,
    //   label: {
    //     ru: 'Кастомный редактор',
    //     en: 'Custom editor',
    //   },
    //   defaultValue: false,
    // }),
    //
    getGroupLabel('Карта', 'Map'),
    ...getMapSettings(),
    //
    getGroupLabel('Кластеризация', 'Clustering'),
    ...getClusterSettings(),
    //
    getGroupLabel('Тепловая карта', 'Heat map'),
    ...getHeatSettings(dataSettings),
    //
    getGroupLabel('Всплывающие подсказки', 'Tooltip'),
    ...getTooltipSettings(),
  ];
};

export const validation: ViewSettingsValidation = {};
