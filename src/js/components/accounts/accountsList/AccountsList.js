/**
 * Created by Игорь on 03.01.2016.
 */
import React, { Component, PropTypes } from 'react';
import shouldComponentUpdate from 'react-pure-render/function';
import styles from './AccountsList.scss';

import { validateAccountForm } from './../../../utils/validators.js';
import * as API from './../../../utils/API.js';
import Account from './../account/Account.js';

/**
 * Генерация uid
 * */
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

class AccountsList extends Component {
    static displayName = "AccountsList";
    shouldComponentUpdate  = shouldComponentUpdate;
    constructor(props) {
        super(props);
        this.state = {accounts : []};
    }

    static propTypes = {
        updateUser: PropTypes.func,
        user: PropTypes.object,
        l: PropTypes.func.isRequired
    };

    componentWillMount () {
        this.getAccounts();
    }

    /**
     * Возвращает пустой account
     * */
    getEmptyAccount() {
        return {
            iban: '',
            bic: '',
            id: null,
            uid: guid()
        };
    }

    /**
     * Сохраняет в state список Account
     * */
    getAccounts (props = null) {
        if (!props) {
            props = this.props;
        }

        const {user} = props;
        let accounts = [];

        if (user && user.accounts && Array.isArray(user.accounts)) {
            user.accounts.map(d => d.uid = guid());
            accounts = [...user.accounts];
        }
        // Добавление пустого Account для заполнения
        accounts = accounts.concat([this.getEmptyAccount()]);

        this.setState({accounts});
    }

    /**
     * Добавление формы
     * */
    addAccount = () => {
        this.setState({
            accounts: this.state.accounts.concat([this.getEmptyAccount()])
        });
    };

    /**
     * Сохранение форм
     * */
    saveAccounts = () => {
        const forms = document.forms;
        let valid = true;
        let {accounts} = this.state;
        const {user, updateUser} = this.props;

        // Перебор форм
        if (forms && forms.length) {
            for (let i = 0, length = forms.length; i < length; i++) {
                let d = forms[i];

                // Поиск соответсвующего account из state
                let account = accounts.filter(g => g.uid === d.uid.value)[0];
                if (account) {
                    // Валидация
                    let form = {
                        iban: {
                            value: d.iban.value
                        },
                        bic: {
                            value: d.bic.value
                        }
                    };

                    const validation = validateAccountForm(form);
                    if (!validation.valid) {
                        // Данные проверки в state
                        account.validationResult = validation.form;
                    } else {
                        account.validationResult = null;
                        account.iban = form.iban.value;
                        account.bic = form.bic.value;
                    }

                    // Последняя пустая не должна учитываться
                    if (i === length - 1) {
                        if (length > 1 && !validation.valid) {
                            if (validation.form.iban.required && validation.form.bic.required) {
                                accounts.splice(i, 1);
                                validation.valid = true;
                            }
                        }
                    }

                    valid &= validation.valid;
                }
            }
        }

        // Если валидация прошла, то данные на сервер
        if (valid) {
            API.updateUserAccounts(user, [...accounts]).then((response) => {
                updateUser(response.data.user);
            });
        }

        accounts = accounts.concat([this.getEmptyAccount()]);

        this.setState({accounts});
    };

    /**
     * Удаление account
     * */
    onDelete = (uid, id) => {
        let {user, updateUser} = this.props;
        let accounts = this.state.accounts.filter(d => {
            return !(d.uid === uid || (id && d.id === id));
        });

        if (!accounts.length) {
            accounts.push(this.getEmptyAccount());
        }

        this.setState({accounts});

        // На сервер изменения (только реальные account)
        API.updateUserAccounts(user, [...accounts.filter(d => d.id)]).then((response) => {
            updateUser(response.data.user);
        });
    };

    render () {
        const {user, updateUser, l} = this.props;
        const {accounts} = this.state;
        const header = (updateUser && user)
            ? (
                <p className={styles.header}>
                    {
                        l('ACCOUNTS_FORM->USER_HEADER', {
                            firstName: user.firstName, middleName: user.middleName, lastName: user.lastName
                        })
                    }
                </p>
            )
            : <p className={styles.header}>{ l('ACCOUNTS_FORM->NOT_FOUND_USER_HEADER')}</p>;

        const accountsList = accounts.map(account => {
            return <Account
                l={l}
                key={account.id === null ? account.uid : account.id}
                onDelete={this.onDelete}
                account={account} />;
        });
        return (
            <div className={styles.accounts} ref="accounts">
                {header}
                {accountsList}

                <div className="buttons">
                    <button  onClick={this.saveAccounts}>{l('ACCOUNTS_LIST->SAVE_ACCOUNTS')}</button>
                    <button className="add-account" onClick={this.addAccount}>{l('ACCOUNTS_LIST->ADD_ACCOUNT_LINK')}</button>
                </div>
            </div>
        );
    }
}

export default AccountsList;
