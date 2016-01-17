import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configureStore';
const store = configureStore();

// Синхронизация store с history reducer
syncHistoryWithStore(browserHistory, store);

// Контейнеры
import App from './containers/AppContainer.js';
import Loading from './containers/LoadingContainer.js';
import User from './containers/UserContainer.js';
import Accounts from './containers/AccountsContainer.js';
import Users from './containers/UsersContainer.js';

// Строится приложение
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Loading} >
                <Route name="app" path=":language" component={App}>
                    <IndexRoute component={Users} />
                    <Route name="updateUser" path="users/:userId" component={User} >
                        <Route name="accounts" path="accounts" component={Accounts} />
                        <Route name="default" path="*" component={Accounts} />
                    </Route>
                    <Route name="default" path="*" component={Users} />
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);