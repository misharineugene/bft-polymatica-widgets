// @ts-nocheck
import { useState } from 'react';

export const useAppState = () => {
    const [state, setState] = useState(
        (window['htable'] && window['htable']['state']) || {},
    );

    window['htable'] = {
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
