/**
 * Created by Игорь on 05.01.2016.
 */
import React, { Component, PropTypes } from 'react';
import shouldComponentUpdate from 'react-pure-render/function';

import ChangeLanguage from './../changeLanguage/ChangeLanguage.js';

import styles from './Application.scss';

class Application extends Component {
    static displayName = "Application";
    shouldComponentUpdate  = shouldComponentUpdate;

    static propTypes = {
        l: PropTypes.func.isRequired,
        component: PropTypes.any
    };
    
    render() {
        return (
            <div className={styles.application}>
                <ChangeLanguage l={this.props.l} />
                {this.props.component}
            </div>
        );
    }
}

export default Application;
