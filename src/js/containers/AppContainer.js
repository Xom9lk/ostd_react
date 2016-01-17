/**
 * Created by Игорь on 05.01.2016.
 */
import React, { Component, Children, PropTypes } from 'react';
import { connect } from 'react-redux';

import localizations from './../../localizations/output/all.js';

import ChangeLanguage from './../components/changeLanguage/ChangeLanguage.js';

import styles from './styles/app.scss';

class AppContainer extends Component {

    static propTypes = {
        language: PropTypes.string,
        dispatch: PropTypes.func.isRequired
    };

    render() {
        const {language, params, dispatch} = this.props;
        return (
            <div className={styles.application}>
                <ChangeLanguage dispatch={dispatch} language={language} params={params}/>
                {this.props.children}
            </div>
        );
    }
}

/**
 * Запись языковых функций в контекст
 * */
class LanguageProvider extends Component {
    static propTypes = {
        language: PropTypes.string
    };

    static childContextTypes = {
        l: PropTypes.func.isRequired,
        language: PropTypes.string.isRequired
    };

    getChildContext() {
        let {language} = this.props;
        let func = null;
        if (!language) {
            // Пустая функция
            func = function () {
                return "";
            };
            language = "";
        } else {
            // Функция клонируется
            func = localizations(language).bind({});
        }
        return {l: func, language};
    }

    render () {
        return Children.only(this.props.children);
    }
}

function mapStateToProps(state) {
    return {
        language: state.languageData.language
    };
}

export default connect(mapStateToProps)(AppContainer);
export const MyProvider = connect(mapStateToProps)(LanguageProvider);
