import { createContext } from 'react';
// types
import { contextType } from '../types';

const initState: contextType = {
  lang: 'ru',
};

export const Context = createContext<contextType>(initState);
