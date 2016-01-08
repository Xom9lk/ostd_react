/**
 * Created by Игорь on 03.01.2016.
 */
import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';

import { validateAccountForm } from './../../utils/validators.js';
import * as API from './../../utils/API.js';
import Account from './../account/Account.js';

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialStateValue();
    }

    componentWillMount () {
        this.getAccounts();
    }

    getEmptyAccount() {
        return {
            iban: '',
            bic: '',
            id: null,
            uid: guid()
        };
    }

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
        accounts = accounts.concat([this.getEmptyAccount()]);

        this.setState({accounts});
    }

    getInitialStateValue () {
        return {
            accounts : []
        };
    }

    static contextTypes = {
        l: PropTypes.func.isRequired
    };

    static propTypes = {
        updateUser: PropTypes.func,
        user: PropTypes.object,
        dispatch: PropTypes.func.isRequired
    };

    addAccount = () => {
        this.setState({
            accounts: this.state.accounts.concat([this.getEmptyAccount()])
        });
    };

    saveAccounts = () => {
        const forms = document.forms;
        let valid = true;
        let {accounts} = this.state;
        let {user, updateUser} = this.props;
        if (forms && forms.length) {
            for (let i = 0, length = forms.length; i < length; i++) {
                let d = forms[i];
                let account = accounts.filter(g => g.uid === d.uid.value)[0];
                if (account) {
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
                        account.validationResult = validation.form;
                    } else {
                        account.validationResult = null;
                        account.iban = form.iban.value;
                        account.bic = form.bic.value;
                    }

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

        if (valid) {
            API.updateUserAccounts(user, [...accounts]).then((response) => {
                updateUser(response.data.user);
            });
        }

        accounts = accounts.concat([this.getEmptyAccount()]);

        this.setState({accounts});
    };

    onDelete = (uid, id) => {
        let {user, updateUser} = this.props;
        let accounts = this.state.accounts.filter(d => {
            return !(d.uid === uid || (id && d.id === id));
        });

        if (!accounts.length) {
            accounts.push(this.getEmptyAccount());
        }

        this.setState({accounts});

        API.updateUserAccounts(user, [...accounts.filter(d => d.id)]).then((response) => {
            updateUser(response.data.user);
        });
    };

    render () {
        const {l} = this.context;
        const {user, updateUser} = this.props;
        const {accounts} = this.state;
        let header = <p className={styles.header}>{ l('ACCOUNTS_FORM->NOT_FOUND_USER_HEADER')}</p>;
        if (updateUser) {
            if (user) {
                header = <p className={styles.header}>{
                    l('ACCOUNTS_FORM->USER_HEADER', {
                        firstName: user.firstName, middleName: user.middleName, lastName: user.lastName
                    })
                }</p>;
            }
        }
        const accountsList = accounts.map(account => {
            return <Account onDelete={this.onDelete} key={account.id === null ? account.uid : account.id} uid={account.uid} user={user} updateUser={updateUser} account={account} />;
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

export default AddUser;
