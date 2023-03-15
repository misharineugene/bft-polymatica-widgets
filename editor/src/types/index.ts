import { MutableRefObject, ReactNode } from 'react';
//
import { TourStepProps } from 'antd';

export type langType = 'ru' | 'en';

export type elementType =
  | 'switch'
  | 'input'
  | 'number'
  | 'select'
  | 'radioButton'
  | 'list'
  | 'formList'
  | 'formula'
  | 'color'
  | 'text';

export type labelType = {
  ru: string;
  en: string;
};

export type optionType = {
  label: labelType;
  value: string;
};

type helpLangType = {
  title: ReactNode;
  description?: ReactNode;
};

type helpType = {
  ru: helpLangType;
  en: helpLangType;
  cover?: ReactNode;
  target?: () => HTMLElement | HTMLElement;
};

export type childType = {
  key: string;
  label: labelType;
  element: elementType;
  defaultValue: boolean | number | string;
  //
  help?: helpType;
  target?: number;
  options?: optionType[];
  extraBy?: string;
  extraByValues?: (boolean | number | string)[];
  formulaBy?: string;
  formListWords?: labelType[];
  kids?: childType[];
};

export type settingType = {
  key: string;
  label: labelType;
  childs: childType[];
};

export type stepsType = {
  [key: string]: TourStepProps[];
};

export type keyType = string | string[];

export type onFormType = (
  key: string,
  value: boolean | number | string,
) => void;

export type refsType = MutableRefObject<null>[];

export type contextType = {
  lang: langType;
};

type dataItem = {
  [key: string]: number | string;
};

export type columnType = {
  type: string;
  id: number;
  path: string;
  name: string;
};

type columnByBlockType = {
  [key: string]: columnType[];
};

export type stateType = {
  lang: langType;
  data: dataItem[];
  columnsByBlock: columnByBlockType;
  settings: settingType[];
};

export type settingItemType = {
  target: number;
  element: elementType;
  value: boolean | number | string;
};
////////////////////////
export type hasArrType = {
  fontSize?: boolean;
  color?: boolean;
  backgroundColor?: boolean;
  fontWeight?: boolean;
  fontStyle?: boolean;
  lineHeight?: boolean;
  align?: boolean;
};

export type richType = {
  [key: string]: {
    fontSize?: string;
    color?: string;
    backgroundColor?: string;
    fontWeight?: string;
    fontStyle?: string;
    lineHeight?: string;
    align?: string;
  };
};

export type urefType = MutableRefObject<null> | MutableRefObject<null>[];
