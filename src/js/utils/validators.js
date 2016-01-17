/**
 * Created by Игорь on 07.01.2016.
 */
var IBAN = require('iban');

function testString(stringObj, specialTestResult = null, expr = null) {
    expr = expr ? expr : /^([А-Яa-яё\w\s]*)$/i;
    if (!stringObj.value.length) {
        stringObj.error = true;
        stringObj.required = true;
    }

    if (specialTestResult !== null) {
        if (!specialTestResult) {
            stringObj.error = true;
            stringObj.invalid = true;
        }
    } else {
        if (!expr.test(stringObj.value)) {
            stringObj.error = true;
            stringObj.invalid = true;
        }
    }

    return !stringObj.error;
}

/**
 * @param {Object} form
 * @param {{value: string}} form.firstName
 * @param {{value: string}} form.lastName
 * @param {{value: string}} form.lastName
 * @returns {{valid: Boolean, form: Object}}
 * */
export function validateUserForm (form) {
    let valid = true;
    valid &= testString(form.firstName);
    valid &= testString(form.middleName);
    valid &= testString(form.lastName);

    return {
        valid,
        form
    };
}

/**
 * @param {Object} form
 * @param {{value: string}} form.iban
 * @param {{value: string}} form.bic
 * @returns {{valid: Boolean, form: Object}}
 * */
export function validateAccountForm (form) {
    let valid = true;
    valid &= testString(form.iban, IBAN.isValid(form.iban.value));
    valid &= testString(form.bic, null, /^([a-zA-Z]){4}([a-zA-Z]){2}([0-9a-zA-Z]){2}([0-9a-zA-Z]{3})?$/i);

    return {
        valid,
        form
    };
}