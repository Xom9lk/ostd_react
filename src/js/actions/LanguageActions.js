/**
 * Created by Игорь on 03.01.2016.
 */
import * as types from './../actionTypes';
import * as API from './../utils/API.js';
import getUserLanguage from './../utils/getUserLanguage.js';
import localizations from './../../localizations/output/all.js';

export function getLanguage(language) {
    return {
        type: types.LANGUAGE_GET_LANGUAGE,
        language
    };
}

export function startLoading() {
    return {
        type: types.LANGUAGE_START_LOADING
    };
}

export function stopLoading() {
    return {
        type: types.LANGUAGE_STOP_LOADING
    };
}

export function getLanguageAsync() {
    return dispatch => {
        setTimeout (() => {
            dispatch(startLoading());
            API.getLanguage()
                .then(response => {
                    dispatch(getLanguage(response.data.language));
                    dispatch(stopLoading());
                })
                .catch(() => {
                    let language = getUserLanguage();
                    dispatch(setLanguageAsync(language));
                });
        }, 0);
    };
}

export function setLanguage(language) {
    return {
        type: types.LANGUAGE_SET_LANGUAGE,
        language
    };
}

export function setLanguageAsync(language) {
    return dispatch => {
        API.setLanguage(language)
            .then(() => {
                dispatch(stopLoading());
                dispatch(setLanguage(language));
            });

    };
}

export function loadLanguageFunc(l) {
    return {
        type: types.LANGUAGE_LOAD_FUNC,
        func: l
    };
}

export function loadLanguageFuncAsync(language) {
    return dispatch => {
        return new Promise(resolve => resolve(localizations(language)))
            .then(l => dispatch(loadLanguageFunc(l)));
    };
}