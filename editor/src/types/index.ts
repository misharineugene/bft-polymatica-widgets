import { MutableRefObject } from 'react';
//
import { ColProps, TourStepProps } from 'antd';

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
  | 'text'
  | 'slider'
  | 'combo';

export type labelType = {
  ru: string;
  en: string;
};

export type optionType = {
  label: labelType;
  value: string;
};

type helpLangType = {
  title: string;
  description?: string;
};

type helpType = {
  ru: helpLangType;
  en: helpLangType;
  cover?: string[];
};

export type valueType = boolean | number | string;

export type attrsType = {
  [key: string]: any;
};

export type onComboChange = (value: valueType | null, index: string) => void;

export type childType = {
  key: string;
  label: labelType;
  element: elementType;
  defaultValue: valueType;
  //
  col?: ColProps;
  attrs?: attrsType;
  help?: helpType;
  target?: number;
  options?: optionType[];
  extraBy?: string;
  extraByValues?: valueType[];
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

export type onFormType = (key: string, value: valueType) => void;

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
  value: valueType;
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
