/**
 * Created by Игорь on 03.01.2016.
 */
import * as types from './../actionTypes';

const initialState = {
    language: null,
    loading: false
};

function languageState(state = initialState, action = {}) {
    switch (action.type) {
        case types.LANGUAGE_SET_LANGUAGE:
        {
            return {
                language: action.language,
                loading: state.loading
            };
        }
        case types.LANGUAGE_START_LOADING:
        {
            return {
                language: state.language,
                loading: true
            };
        }
        case types.LANGUAGE_STOP_LOADING:
        {
            return {
                language: state.language,
                loading: false
            };
        }
        case types.LANGUAGE_GET_LANGUAGE:
        {
            return {
                language: action.language,
                loading: state.loading
            };
        }

        default: {
            return state;
        }
    }
}

export default languageState;