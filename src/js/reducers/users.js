/**
 * Created by Игорь on 03.01.2016.
 */
import * as types from './../actionTypes';

const initialState = {
    users: [],
    usersById: {},
    loaded: false,
    loading: false
};

function usersState(state = initialState, action = {}) {
    if (!state.loaded &&
        !(action.type === types.USERS_GET_USERS
        || action.type === types.USERS_START_LOADING
        || action.type === types.USERS_STOP_LOADING)) {
        return state;
    }

    switch (action.type) {
        case types.USERS_ADD_USER:
        {
            const {usersById, users} = state,
                {user} = action;

            return {
                users: users.concat(user.id),
                usersById: {
                    ...usersById,
                    [user.id]: {
                        ...user
                    }
                },
                loading: state.loading,
                loaded: state.loaded
            };
        }

        case types.USERS_UPDATE_USER:
        {
            const {usersById, users} = state,
                {user} = action;
            usersById[user.id] = {...user};

            return {
                users: [...users],
                usersById: {...usersById},
                loading: state.loading,
                loaded: state.loaded
            };
        }

        case types.USERS_DELETE_USER:
        {
            const {usersById, users} = state;
            delete usersById[action.id];
            return {
                users: users.filter(id => id !== action.id),
                usersById: {...usersById},
                loading: state.loading,
                loaded: state.loaded
            };
        }

        case types.USERS_GET_USERS:
        {
            const usersList = action.users;
            const usersById = {};
            const users = usersList.map(user => {
                usersById[user.id] = user;
                return user.id;
            });

            return {
                users: [...users],
                usersById: usersById,
                loading: state.loading,
                loaded: state.loaded
            };
        }

        case types.USERS_START_LOADING:
        {
            const {usersById, users} = state;
            return {
                users: [...users],
                usersById: {
                    ...usersById
                },
                loading: true,
                loaded: state.loaded
            };
        }

        case types.USERS_STOP_LOADING:
        {
            const {usersById, users} = state;
            return {
                users: [...users],
                usersById: {
                    ...usersById
                },
                loading: false,
                loaded: true
            };
        }

        default: {
            return state;
        }
    }
}

export default usersState;
export const name = 'usersState';