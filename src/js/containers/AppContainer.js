/**
 * Created by Игорь on 05.01.2016.
 */
import React, { Component, PropTypes } from 'react';
import shouldComponentUpdate from 'react-pure-render/function';
import { connect } from 'react-redux';

import Application from './../components/application/Application';

class AppContainer extends Component {
    static displayName = "AppContainer";
    shouldComponentUpdate  = shouldComponentUpdate;

    static propTypes = {
        l: PropTypes.func.isRequired
    };
    
    render() {
        return <Application l={this.props.l} component={this.props.children} />;
    }
}

function mapStateToProps(state) {
    return {
        l: state.l
    };
}

export default connect(mapStateToProps)(AppContainer);
