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

class UsersContainer extends Component {

    static propTypes = {
        users: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    render () {
        const { users, actions, dispatch } = this.props;

        return (
            <div className={styles.view}>
                <FormUser addUser={actions.addUser} dispatch={dispatch} />
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

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);