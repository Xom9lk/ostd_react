/**
 * Created by Игорь on 06.01.2016.
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const requireAll = requireContext => {
    const req = {};
    requireContext.keys().map((d, i) => {
        d = requireContext(d);
        req[d.name || i] = d.default;
    });
    return req;
};

const reducers = requireAll(require.context("./reducers", false, /^\.\/.*\.js$/));


const rootReducer = combineReducers(Object.assign({}, reducers, {
    routing: routerReducer
}));

export default rootReducer;