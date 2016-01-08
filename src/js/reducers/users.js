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
            let {usersById, users} = state,
                {user} = action;

            return {
                users: users.concat(user),
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
            let {usersById, users} = state,
                {user} = action;
            usersById = {...usersById};
            users = [...users];
            usersById[user.id] = user;
            users = users.map(d => (d.id === user.id) ? user : d);

            return {
                users: users,
                usersById: usersById,
                loading: state.loading,
                loaded: state.loaded
            };
        }

        case types.USERS_DELETE_USER:
        {
            let {usersById, users} = state;
            let newUsersById = {...usersById};
            delete newUsersById[action.id];
            return {
                users: users.filter(user => user.id !== action.id),
                usersById: newUsersById,
                loading: state.loading,
                loaded: state.loaded
            };
        }

        case types.USERS_GET_USERS:
        {
            const {users} = action;
            let usersById = {};
            users.map(user => {
                usersById[user.id] = user;
            });

            return {
                users: [...users],
                usersById: {...usersById},
                loading: state.loading,
                loaded: state.loaded
            };
        }

        case types.USERS_START_LOADING:
        {
            const {usersById} = state;
            return {
                users: [...state.users],
                usersById: {
                    ...usersById
                },
                loading: true,
                loaded: state.loaded
            };
        }

        case types.USERS_STOP_LOADING:
        {
            const {usersById} = state;
            return {
                users: [...state.users],
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