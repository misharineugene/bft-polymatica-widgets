// @ts-nocheck
import { useState } from 'react';

export const useAppState = () => {
  const [state, setState] = useState(
    (window['h_table'] && window['h_table']['state']) || {},
  );

  window['h_table'] = {
    _state: state,
    get state() {
      return this._state;
    },
    set state(value) {
      setState(value);
      this._state = value;
    },
  };

  return state;
};
