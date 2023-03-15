import { useState } from 'react';
// types
import { childType } from '../types';

export type formulaType = {
  [key: string]: {
    [key: string]: string;
  };
};

export const useFormula = (options: childType[]) => {
  const initState = options.reduce((acc: formulaType, item) => {
    if (item.element === 'formula') {
      acc[item.key] = {};
    } else if (item.kids) {
      item.kids.forEach((kid) => {
        if (kid.element === 'formula') {
          acc[kid.key] = {};
        }
      });
    }

    return acc;
  }, {});

  return useState(initState);
};
