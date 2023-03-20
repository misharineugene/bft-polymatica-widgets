export type RichToOptionType = {
  [key: string]: string;
};

export type marginType = {
  top: string | number;
  bottom: string | number;
  //
  left: string | number;
  right: string | number;
};

export type settingItemType = {
  target: number;
  element: string;
  value: boolean | number | string;
};

export type SettingType = {
  [key: string]: boolean | number | string;
};
