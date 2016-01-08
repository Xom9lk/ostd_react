/**
 * Created by Игорь on 06.01.2016.
 */
import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';
import { pushPath } from 'redux-simple-router';

import { languages } from './../../../constants.js';
import getPathForUrl from './../../utils/getPathForUrl.js';

export default class extends Component {

    static contextTypes = {
        l: PropTypes.func.isRequired
    };

    static propTypes = {
        language: PropTypes.string,
        dispatch: PropTypes.func.isRequired,
        params: PropTypes.object
    };

    /**
     * @param {MouseEvent} event
     * */
    onChangeLanguage = (event) => {
        const {dispatch, params} = this.props;
        const path = getPathForUrl(params, {language: event.target.value});
        dispatch(pushPath(path));
    };

    render () {
        const {l} = this.context;
        return (
            <div className={styles.changeLanguage}>
                    <label htmlFor={styles.select}>{l('MAIN->CHANGE_LANGUAGE')}:</label>
                    <select name="change-language" className={styles.select} id={styles.select} onChange={this.onChangeLanguage} value={this.props.language}>
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