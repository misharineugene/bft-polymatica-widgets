// types
import { childType } from '../types';

type extraMapType = {
  [key: string]: string[];
};

type extraMapValuesType = {
  [key: string]: (string | number | boolean)[][];
};

type formulaMapType = {
  [key: string]: string;
};

export const getExtraMap = (options: childType[]) => {
  const extraMap: extraMapType = {};
  const extraMapValues: extraMapValuesType = {};

  options.forEach((item) => {
    const key = item.key;
    const extraKey = item.extraBy;
    const extraValues = item.extraByValues;

    if (typeof extraKey !== 'undefined' && typeof extraValues !== 'undefined') {
      if (!extraMap[extraKey]) {
        extraMap[extraKey] = [];
        extraMapValues[extraKey] = [];
      }
      extraMap[extraKey].push(key);
      extraMapValues[extraKey].push(extraValues);
    }
  });

  return {
    extraMap,
    extraMapValues,
  };
};

export const getFormulaMap = (options: childType[]) => {
  const formulaMap: formulaMapType = {};

  options.forEach((item) => {
    if (item.formulaBy) {
      formulaMap[item.formulaBy] = item.key;
    } else if (item.kids) {
      item.kids.forEach((kid) => {
        if (kid.formulaBy) {
          formulaMap[kid.formulaBy] = kid.key;
        }
      });
    }
  });

  return formulaMap;
};

export const keyHasTag = (
  key: string,
  map: { [key: string]: string },
): string => {
  const keyLower = key.toLowerCase();

  const result = Object.keys(map).find((mapKey) => {
    const mapKeyLower = mapKey.toLowerCase();

    return keyLower.includes(mapKeyLower);
  });

  return result ? map[result] : '';
};
