/**
 * Created by Игорь on 03.01.2016.
 */
import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from "./../rootReducer.js";
import {DevTools} from "./../containers/DevToolsContainer.js";

const finalCreateStore = compose(
    // Middleware you want to use in development:
    applyMiddleware(thunkMiddleware, logger()),
    // Required! Enable Redux DevTools with the monitors you chose
    DevTools.instrument(),
    // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
    persistState(getDebugSessionKey())
)(createStore);

function getDebugSessionKey() {
    // You can write custom logic here!
    // By default we try to read the key from ?debug_session=<key> in the address bar
    const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
    return (matches && matches.length > 0)? matches[1] : null;
}

export default function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState);

    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    if (module.hot) {
        module.hot.accept("./../rootReducer", () =>
            store.replaceReducer(require("./../rootReducer")/*.default if you use Babel 6+ */)
        );
    }

    return store;
}