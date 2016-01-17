/**
 * Created by Игорь on 06.01.2016.
 */
import routerSing from './routerSing.js';

const initialParams = {
    language: undefined,
    userId: undefined,
    accounts: undefined
};

/**
 * Получить строку path
 * Если параметры объекта params равны null или undefined, то параметр берется из текущего состояния
 *
 * @param {?object} propsParams текущие данные params
 * @param {?object} [params=initialParams] новые данные params
 * */
export default function (propsParams, params = initialParams) {
    if (!propsParams) {
        propsParams = routerSing.get().state.params;
    }
    let path = '';

    // language
    if (params.language === undefined) {
        if (!propsParams.language || propsParams.language === "") {
            return path;
        } else {
            path += `/${propsParams.language}`;
        }
    } else if (params.language === false) {
        return path;
    } else {
        path += `/${params.language}`;
    }

    // userId
    if (params.userId === undefined) {
        if (!propsParams.userId || propsParams.userId === "") {
            return path;
        } else {
            path += `/users/${propsParams.userId}`;
        }
    } else if (params.userId === false) {
        return path;
    } else {
        path += `/users/${params.userId}`;
    }

    // accounts
    if (params.accounts === undefined) {
        const state = routerSing.get().state;
        if (state.routes.filter(d => d.name === 'accounts')[0]) {
            path += `/accounts`;
        } else {
            return path;
        }
    } else if (params.accounts === false) {
        return path;
    } else {
        path += `/accounts`;
    }

    return path;
}