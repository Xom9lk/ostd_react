/**
 * Created by Игорь on 06.01.2016.
 */
import React, { Component, PropTypes } from 'react';
import shouldComponentUpdate from 'react-pure-render/function';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import styles from './ChangeLanguage.scss';

import { languages } from './../../../constants.js';
import getPathForUrl from './../../utils/getPathForUrl.js';

class ChangeLanguage extends Component {
    static displayName = "ChangeLanguage";
    shouldComponentUpdate  = shouldComponentUpdate;
    
    static propTypes = {
        language: PropTypes.string,
        l: PropTypes.func.isRequired
    };

    /**
     * @param {MouseEvent} event
     * */
    onChangeLanguage = (event) => {
        const path = getPathForUrl({language: event.target.value});
        browserHistory.push(path);
    };

    render () {
        const {l, language} = this.props;
        return (
            <div className={styles.changeLanguage}>
                    <label htmlFor={styles.select}>{l('MAIN->CHANGE_LANGUAGE')}:</label>
                    <select
                        name="change-language"
                        className={styles.select}
                        id={styles.select}
                        onChange={this.onChangeLanguage}
                        value={language}>
                        {
                            languages.map(
                                d => (
                                    <option
                                        value={d.name}
                                        key={d.name}>
                                        {d.description}
                                    </option>
                                )
                            )
                        }
                    </select>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        l: state.l,
        language: state.languageData.language
    };
}

export default connect(mapStateToProps)(ChangeLanguage);