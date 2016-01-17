/**
 * Created by Игорь on 03.04.2016.
 */
import React, { Component, PropTypes } from 'react';
import shouldComponentUpdate from 'react-pure-render/function';

import UsersList from './../users/usersList/UsersList.js';
import AccountsList from './../accounts/accountsList/AccountsList.js';

import styles from './Accounts.scss';

class Accounts extends Component {
    static displayName = "Accounts";
    shouldComponentUpdate  = shouldComponentUpdate;

    static propTypes = {
        l: PropTypes.func.isRequired,
        usersState: PropTypes.object.isRequired,
        usersActions: PropTypes.object.isRequired,
        user: PropTypes.object
    };

    render () {
        const { user, usersState, usersActions, l } = this.props;

        return (
            <div className={styles.view}>
                <AccountsList l={l} key={user ? user.id : null} updateUser={usersActions.updateUser} user={user} />
                <UsersList l={l} user={user} usersState={usersState} actions={usersActions} />
            </div>
        );
    }
}

export default Accounts;