import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import { createHashHistory } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router';

import configureStore from './store/configureStore';
import routeSing  from './utils/routerSing.js';
const store = configureStore();

const history = createHashHistory({
    queryKey: false
});

syncReduxAndRouter(history, store);

// Контейнеры
import App, {MyProvider} from './containers/AppContainer.js';
import Loading from './containers/LoadingContainer.js';
import User from './containers/UserContainer.js';
import Accounts from './containers/AccountsContainer.js';
import Users from './containers/UsersContainer.js';


// Рендер фейкового роута и сохранение его в контейнер
const routes = (
    <Router history={history}>
        <Route path="/" >
            <Route name="app" path=":language">
                <IndexRoute />
                <Route name="updateUser" path="users/:userId">
                    <Route name="accounts" path="accounts" />
                    <Route name="default" path="*" />
                </Route>
                <Route name="default" path="*" />
            </Route>
        </Route>
    </Router>
);
routeSing.set(
    ReactDOM.render(
        routes,
        document.createElement("div")
    )
);

ReactDOM.render(
    <Provider store={store}>
        <MyProvider>
            <Router history={history}>
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
        </MyProvider>
    </Provider>,
    document.getElementById('app')
);