/**
 * Created by Игорь on 03.01.2016.
 */
import React, { Component, PropTypes } from 'react';
import shouldComponentUpdate from 'react-pure-render/function';

import UsersList from './usersList/UsersList.js';
import FormUser from './formUsers/FormUser.js';

import styles from './Users.scss';

class Users extends Component {
    static displayName = "Users";
    shouldComponentUpdate  = shouldComponentUpdate;

    static propTypes = {
        usersState: PropTypes.object.isRequired,
        usersActions: PropTypes.object.isRequired,
        l: PropTypes.func.isRequired
    };

    render () {
        const { l, usersState, usersActions } = this.props;

        return (
            <div className={styles.view}>
                <FormUser l={l} user={null} addUser={usersActions.addUser} />
                <UsersList l={l} user={null} usersState={usersState} actions={usersActions} />
            </div>
        );
    }
}

export default Users;