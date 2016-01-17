/**
 * Created by Игорь on 06.01.2016.
 */
import * as routerData from './../data/routerData';

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
export default function (params = initialParams) {
    const currentParams = routerData.get().params,
        routesList = routerData.get().routes;
    let path = '';

    // language
    if (params.language === undefined) {
        if (!currentParams.language || currentParams.language === "") {
            return path;
        } else {
            path += `/${currentParams.language}`;
        }
    } else if (params.language === false) {
        return path;
    } else {
        path += `/${params.language}`;
    }

    // userId
    if (params.userId === undefined) {
        if (!currentParams.userId || currentParams.userId === "") {
            return path;
        } else {
            path += `/users/${currentParams.userId}`;
        }
    } else if (params.userId === false) {
        return path;
    } else {
        path += `/users/${params.userId}`;
    }

    // accounts
    if (params.accounts === undefined) {
        if (routesList.filter(d => d.name === 'accounts')[0]) {
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