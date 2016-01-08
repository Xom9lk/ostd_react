/**
 * Created by Игорь on 06.01.2016.
 */
import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';

import users from './reducers/users.js';
import language from './reducers/language.js';

const rootReducer = combineReducers({
    users: users,
    languageData: language,
    routing: routeReducer
});

export default rootReducer;