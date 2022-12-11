import {
  CreateViewSettings,
  ViewSettingsValidation,
} from 'ptnl-constructor-sdk/config';
import { DataSettings, ViewSettings } from 'ptnl-constructor-sdk';

export const createViewSettings: CreateViewSettings<DataSettings> = ({
  dataSettings,
  viewSettings,
}: {
  dataSettings: DataSettings;
  viewSettings: ViewSettings;
}) => {
  const { columnsByBlock } = dataSettings;

  return [];
};

export const validation: ViewSettingsValidation = {};
