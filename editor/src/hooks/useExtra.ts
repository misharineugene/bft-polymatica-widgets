import { useState } from 'react';
// types
import { childType } from '../types';

export type extraType = {
  [key: string]: boolean;
};

export const useExtra = (options: childType[]) => {
  const initState = options.reduce((acc: extraType, item) => {
    acc[item.key] = false;

    return acc;
  }, {});

  return useState(initState);
};
