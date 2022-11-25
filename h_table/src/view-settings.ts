import { DataSettings, ViewSettings } from 'ptnl-constructor-sdk';
import {
  CreateViewSettings,
  ViewSettingsValidation,
} from 'ptnl-constructor-sdk/config';

export const createViewSettings: CreateViewSettings<DataSettings> = ({
  dataSettings,
  viewSettings,
}: {
  dataSettings: DataSettings;
  viewSettings: ViewSettings;
}) => {
  return [];
};

export const validation: ViewSettingsValidation = {};
