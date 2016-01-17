/**
 * Created by Игорь on 27.03.2016.
 */
import * as types from './../actionTypes';

function lState(state = null, action = {}) {
    switch (action.type) {
        case types.LANGUAGE_LOAD_FUNC:
        {
            return typeof action.func === 'function' ? action.func : null;
        }

        default: {
            return state;
        }
    }
}

export default lState;
export const name = 'l';