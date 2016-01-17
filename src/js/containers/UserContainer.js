/**
 * Created by Игорь on 03.01.2016.
 */
import React, { Component, PropTypes } from 'react';
import shouldComponentUpdate from 'react-pure-render/function';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as UsersActions from '../actions/UsersActions.js';

import User from './../components/users/User';

class UserContainer extends Component {
    static displayName = "UserContainer";
    shouldComponentUpdate  = shouldComponentUpdate;

    static propTypes = {
        l: PropTypes.func.isRequired,
        usersState: PropTypes.object.isRequired,
        usersActions: PropTypes.object.isRequired
    };

    render () {
        const userId = +this.props.params.userId;
        const { usersState, usersActions, l } = this.props;
        const user = (usersState.usersById.hasOwnProperty(userId)) ? usersState.usersById[userId] : null;

        return this.props.children
            ? this.props.children
            : <User l={l} user={user} usersState={usersState} usersActions={usersActions} />;
    }
}

function mapStateToProps(state) {
    return {
        usersState: state.usersState,
        l: state.l
    };
}

function mapDispatchToProps(dispatch) {
    return {
        usersActions: bindActionCreators(UsersActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);