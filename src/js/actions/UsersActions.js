/**
 * Created by Игорь on 03.01.2016.
 */
import * as types from './../actionTypes';
import * as API from './../utils/API.js';

export function startLoading() {
    return {
        type: types.USERS_START_LOADING
    };
}

export function stopLoading() {
    return {
        type: types.USERS_STOP_LOADING
    };
}

export function addUser(user) {
    return {
        type: types.USERS_ADD_USER,
        user
    };
}

export function updateUser(user) {
    return {
        type: types.USERS_UPDATE_USER,
        user
    };
}

export function getUsers(users) {
    return {
        type: types.USERS_GET_USERS,
        users
    };
}

export function getUsersAsync() {
    return dispatch => {
        dispatch(startLoading());
        API.getUsers()
            .then((response) => {
                dispatch(getUsers(response.data.users));
                dispatch(stopLoading());
            });
    };
}

export function deleteUser(id) {
    return {
        type: types.USERS_DELETE_USER,
        id
    };
}

export function deleteUserAsync(id) {
    return dispatch => {
        API.deleteUser(id)
            .then(() => {
                dispatch(deleteUser(id));
            });
    };
}