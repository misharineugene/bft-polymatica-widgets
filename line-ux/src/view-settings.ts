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
import { getTitleSettings } from './settings/title/title.settings';
import { getLegendSettings } from './settings/legend/legend.settings';
import { getGridSettings } from './settings/grid/grid.settings';
import { getXAxisSettings } from './settings/xAxis/xAxis.settings';
import { getYAxisSettings } from './settings/yAxis/yAxis.settings';
import { getDataZoomSettings } from './settings/dataZoom/dataZoom.settings';
import { getTooltipSettings } from './settings/tooltip/tooltip.settings';

export const createViewSettings: CreateViewSettings<DataSettings> = ({
  dataSettings,
  viewSettings,
}: {
  dataSettings: DataSettings;
  viewSettings: ViewSettings;
}) => {
  return [
    checkbox({
      key: EViewKey.CustomEditor,
      label: {
        ru: 'Кастомный редактор',
        en: 'Custom editor',
      },
      defaultValue: false,
    }),
    getGroupLabel('Заголовок', 'Title'),
    ...getTitleSettings(),
    //
    getGroupLabel('Легенда', 'Legend'),
    ...getLegendSettings(),
    //
    getGroupLabel('Область графика', 'Chart area'),
    ...getGridSettings(),
    //
    getGroupLabel('Ось X', 'X Axis'),
    ...getXAxisSettings(),
    //
    getGroupLabel('Ось Y', 'Y Axis'),
    ...getYAxisSettings(),
    //
    getGroupLabel('Масштабирование графика', 'Chart scaling'),
    ...getDataZoomSettings(),
    //
    getGroupLabel('Всплывающие подсказки', 'Tooltip'),
    ...getTooltipSettings(),
  ];
};

export const validation: ViewSettingsValidation = {};
