/**
 * Created by Игорь on 03.01.2016.
 */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as UsersActions from '../actions/UsersActions.js';

import UsersList from '../components/usersList/UsersList.js';
import FormUser from '../components/formUser/FormUser.js';

import styles from './styles/app.scss';

class UserContainer extends Component {
    static contextTypes = {
        l: PropTypes.func.isRequired
    };

    static propTypes = {
        users: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    render () {
        const userId = +this.props.params.userId;
        const { users, actions, dispatch } = this.props;
        let user = null;
        if (users.usersById.hasOwnProperty(userId)) {
            user = users.usersById[userId];
        }

        return this.props.children ? this.props.children :(
            <div className={styles.view}>
                <FormUser key={user ? user.id : null} updateUser={actions.updateUser} addUser={actions.addUser} user={user} dispatch={dispatch} />
                <UsersList usersState={users} actions={actions} dispatch={dispatch} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(UsersActions, dispatch),
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);