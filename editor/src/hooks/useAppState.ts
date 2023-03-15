// @ts-nocheck
import { useState } from 'react';
// types
import { stateType } from '../types';

export const useAppState = (): stateType => {
  const [state, setState] = useState(
    (window['editor'] && window['editor']['state']) || {},
  );

  window['editor'] = {
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
