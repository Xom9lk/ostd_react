/**
 * Created by Игорь on 03.01.2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import DevToolsContainer from './DevToolsContainer.js';

class AppContainer extends Component {
    render() {
        return (
            <DevToolsContainer />
        );
    }
}

export default connect()(AppContainer);