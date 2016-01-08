/**
 * Created by Игорь on 05.01.2016.
 */

import {languages} from './../../constants.js';

/**
 * Возвращает используемый пользователем язык
 *
 * @function getUserLanguage
 * @return {String}
 * */
export default function () {
    let language = window.navigator.userLanguage || window.navigator.language;

    if (language) {
        language = languages.filter(d => {
            return d.name === language || d.aliases.filter(alias => alias === language).length > 0;
        })[0];
    }

    if (!language) {
        language = languages.filter(d => d.default)[0];
    }

    return language.name;
};