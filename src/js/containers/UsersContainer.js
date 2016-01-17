/**
 * Created by Игорь on 03.01.2016.
 */
import React, { Component, PropTypes } from 'react';
import shouldComponentUpdate from 'react-pure-render/function';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as UsersActions from '../actions/UsersActions.js';

import Users from '../components/users/Users.js';

class UsersContainer extends Component {
    static displayName = "UsersContainer";
    shouldComponentUpdate  = shouldComponentUpdate;
    
    static propTypes = {
        usersState: PropTypes.object.isRequired,
        usersActions: PropTypes.object.isRequired,
        l: PropTypes.func.isRequired
    };

    render () {
        const { l, usersState, usersActions } = this.props;

        return <Users l={l} usersState={usersState} usersActions={usersActions} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);