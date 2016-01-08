/**
 * Created by Игорь on 03.01.2016.
 */
import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';
import { Link } from 'react-router';

import getPathForUrl from './../../utils/getPathForUrl.js';

class UsersContainer extends Component {
    static contextTypes = {
        l: PropTypes.func.isRequired,
        location: PropTypes.any,
        history: PropTypes.any
    };

    static propTypes = {
        usersState: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    /**
     * @param {MouseEvent} event
     * @param {Number} id
     * */
    deleteLink (id, event) {
        event.preventDefault();
        const {actions} = this.props;
        actions.deleteUserAsync(id);
    }

    render () {
        const {l} = this.context;
        const {usersState} = this.props;
        let users = usersState.users.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.middleName}</td>
                    <td>{user.lastName}</td>
                    <td className={styles.smallWidth}>
                        <Link className="btn" to={getPathForUrl(null, {userId: user.id, accounts: false})}>{l('USERS_LIST->CHANGE_LINK')}</Link>
                    </td>
                    <td className={styles.smallWidth}>
                        <button onClick={this.deleteLink.bind(this, user.id)}>{l('USERS_LIST->DELETE_LINK')}</button>
                    </td>
                </tr>
            );
        });

        return (
            <div className={styles.list}>
                <p className={styles.header}>{l('USERS_LIST->HEADER')}</p>
                {
                    users.length ?
                        <table>
                            <tbody>
                                <tr>
                                    <th>{l('USER_FORM->FIRST_NAME')}</th>
                                    <th>{l('USER_FORM->MIDDLE_NAME')}</th>
                                    <th>{l('USER_FORM->LAST_NAME')}</th>
                                    <th>{l('USERS_LIST->ACCOUNTS_COUNT')}</th>
                                    <th>{l('USERS_LIST->SELECT_USER')}</th>
                                    <th>{l('USERS_LIST->DELETE_USER')}</th>
                                </tr>
                                {users}
                            </tbody>
                        </table>
                    : null
                }

                <p className={styles.footer}>{l('USERS_LIST->USERS_COUNT', {count: usersState.users.length})}</p>
            </div>
        );
    }
}

export default UsersContainer;