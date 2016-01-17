/**
 * Created by Игорь on 05.01.2016.
 */
import React, { Component, PropTypes } from 'react';
import shouldComponentUpdate from 'react-pure-render/function';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as UsersActions from './../actions/UsersActions.js';
import * as LanguageActions from './../actions/LanguageActions.js';

import DevToolsContainer from './DevToolsContainer.js';

import { languages } from './../../constants.js';
import getPathForUrl from './../utils/getPathForUrl.js';
import * as routerData from './../data/routerData';

class LoadingContainer extends Component {
    static displayName = "LoadingContainer";
    shouldComponentUpdate  = shouldComponentUpdate;
    
    static propTypes = {
        usersState: PropTypes.object.isRequired,
        languageLoading: PropTypes.bool.isRequired,
        language: PropTypes.string,
        usersActions: PropTypes.object.isRequired
    };

    componentWillMount() {
        routerData.set({params: this.props.params, location: this.props.location, routes: this.props.routes});
        this.loadData();
    }
    
    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        routerData.set({params: nextProps.params, location: nextProps.location, routes: nextProps.routes});
        this.loadData(nextProps);
    }

    /**
     * Загружаются все необходимые данные
     * */
    loadData (props = this.props) {
        const {languageActions, usersActions, languageLoading} = props,
            {language} = props.params,
            languageFromState = props.language,
            usersState = props.usersState,
            {l} = props;
        
        // Загружается язык, если языка нет, то пытается подобрать подходящий
        if (!languageLoading) {
            if (languageFromState && !language) {
                // Нужно синхронизировать url
                let path = getPathForUrl({language: languageFromState});
                browserHistory.replace(path);
            } else if (languageFromState && language && languageFromState !== language) {
                // Нужно синхронизировать state из url, если такой язык есть
                if (languages.filter(d => d.name === language)[0]) {
                    languageActions.setLanguageAsync(language);
                    return true;
                } else {
                    // если такого языка нет, то пытается подобрать подходящий и синхронизирует url
                    let path = getPathForUrl({language: languageFromState});
                    browserHistory.replace(path);
                }
            } else if (!language || !languageFromState) {
                // Загрузка языка
                languageActions.getLanguageAsync();
                return true;
            } else if (!l || l("LANGUAGE") !== languageFromState){
                // Устанавливается функция языка
                languageActions.loadLanguageFuncAsync(languageFromState);
            }
        }

        // Загрузка данных пользователя
        if (!usersState.loading) {
            if (!usersState.loaded) {
                usersActions.getUsersAsync();
                return true;
            }
        }
    }

    render() {
        const {l} = this.props;
        return (
            <div>
                {this.props.children && l ? this.props.children : "Loading..."}
                <DevToolsContainer />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        usersState: state.usersState,
        language: state.languageData.language,
        languageLoading: state.languageData.loading,
        l: state.l,
        params: ownProps.params,
        location: ownProps.location,
        routes: ownProps.routes
    };
}

function mapDispatchToProps(dispatch) {
    return {
        usersActions: bindActionCreators(UsersActions, dispatch),
        languageActions: bindActionCreators(LanguageActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingContainer);