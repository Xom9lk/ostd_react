/**
 * Created by Игорь on 05.01.2016.
 */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { replacePath } from 'redux-simple-router';

import * as UsersActions from './../actions/UsersActions.js';
import * as LanguageActions from './../actions/LanguageActions.js';

import RootContainer from './RootContainer.js';

import { languages } from './../../constants.js';
import getPathForUrl from './../utils/getPathForUrl.js';

class LoadingContainer extends Component {

    static propTypes = {
        users: PropTypes.object.isRequired,
        languageLoading: PropTypes.bool.isRequired,
        language: PropTypes.string,
        usersActions: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.loadData();
    }

    componentWillReceiveProps(nextProps) {
        this.loadData(nextProps);
    }

    loadData (props = this.props) {
        const {dispatch, languageActions, usersActions, languageLoading} = props;
        const {language} = props.params;
        const languageFromState = props.language;
        const usersData = props.users;
        // Язык
        if (!languageLoading) {
            if (languageFromState && !language) {
                let path = getPathForUrl(props.params, {language: languageFromState});
                dispatch(replacePath(path));
            } else if (languageFromState && language && languageFromState !== language) {
                if (languages.filter(d => d.name === language)[0]) {
                    languageActions.setLanguageAsync(language);
                    return true;
                } else {
                    let path = getPathForUrl(props.params, {language: languageFromState});
                    dispatch(replacePath(path));
                }
            } else if (!language || !languageFromState) {
                languageActions.getLanguageAsync();
                return true;
            }
        }

        if (!usersData.loading) {
            if (!usersData.loaded) {
                usersActions.getUsersAsync();
                return true;
            }
        }
    }

    render() {
        const {language} = this.props;
        const isLoading = !!language;
        return (
            <div>
                {this.props.children && isLoading ? this.props.children : "Loading..."}
                <RootContainer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.users,
        language: state.languageData.language,
        languageLoading: state.languageData.loading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        usersActions: bindActionCreators(UsersActions, dispatch),
        languageActions: bindActionCreators(LanguageActions, dispatch),
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingContainer);