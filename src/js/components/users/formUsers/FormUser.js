/**
 * Created by Игорь on 03.01.2016.
 */
import React, { Component, PropTypes } from 'react';
import shouldComponentUpdate from 'react-pure-render/function';
import styles from './FormUser.scss';
import {validateUserForm} from './../../../utils/validators.js';
import * as API from './../../../utils/API.js';
import getPathForUrl from './../../../utils/getPathForUrl.js';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

class FormUser extends Component {
    static displayName = "FormUser";
    shouldComponentUpdate  = shouldComponentUpdate;

    constructor(props) {
        super(props);
        this.state = this.getInitialValidationResults();
    }

    static propTypes = {
        addUser: PropTypes.func.isRequired,
        updateUser: PropTypes.func,
        user: PropTypes.object,
        l: PropTypes.func.isRequired
    };
    
    componentDidMount () {
        const {user, updateUser} = this.props;
        if (user && updateUser) {
            this.refs.user.firstName.value = user.firstName;
            this.refs.user.middleName.value = user.middleName;
            this.refs.user.lastName.value = user.lastName;
        }
    }

    getInitialValidationResults () {
        return {
            validationResult: {
                firstName: {},
                middleName: {},
                lastName: {}
            }
        };
    }

    /**
     * Обновление/добавление пользователя, применение валидации
     *
     * @param {Event} event
     * */
    onSubmit = (event) => {
        event.preventDefault();

        let form = {
            firstName: {
                value: this.refs.user.firstName.value
            },
            middleName:  {
                value: this.refs.user.middleName.value
            },
            lastName: {
                value: this.refs.user.lastName.value
            }
        };

        const validation = validateUserForm(form);
        if (validation.valid) {
            // Прошла валидацию
            form = {
                firstName: form.firstName.value,
                middleName: form.middleName.value,
                lastName: form.lastName.value
            };
            const {user, updateUser, addUser} = this.props;

            // Если в props есть user и userUpdate, то команда -> изменить
            if (user && updateUser) {
                form.id = user.id;
                API.updateUser(form).then((response) => {
                    updateUser(response.data.user);
                    browserHistory.push(getPathForUrl({accounts: true}));
                });
            } else {
                // Добавить пользователя
                API.addUser(form).then((response) => {
                    addUser(response.data.user);
                    browserHistory.push(getPathForUrl({accounts: true, userId: response.data.user.id}));
                });
            }
            this.setState(this.getInitialValidationResults());
        } else {
            this.setState({validationResult: validation.form});
        }
    };

    render () {
        const {l, user, updateUser} = this.props,
            {firstName, middleName, lastName} = this.state.validationResult;
        let header = <p className={styles.header}>{l('USER_FORM->ADD_USER_HEADER')}</p>;
        if (updateUser) {
            if (user) {
                header = <p className={styles.header}>{
                    l('USER_FORM->CHANGE_USER_HEADER', {
                        firstName: user.firstName, middleName: user.middleName, lastName: user.lastName
                    })
                }</p>;
            } else {
                header = <p className={styles.header}>{
                    l('USER_FORM->NOT_FOUND_USER_HEADER')
                }</p>;
            }
        }
        const linkToAccounts = (user)
            ? <Link className="btn" to={getPathForUrl({accounts: true})}>{l('USER_FORM->LINK_TO_ACCOUNT')}</Link>
            : null;
        
        return (
            <form className={styles.form} ref="user" onSubmit={this.onSubmit} method="post">
                <fieldset>
                    {header}

                    <div className={firstName.error ? styles.error : ""}>
                        <label htmlFor="firstName">{l('USER_FORM->FIRST_NAME')}:</label>
                        <input name="firstName" id="firstName" type="text"/>
                        {firstName.error ? <p>{firstName.required ? l('USER_FORM->REQUIRED_ERROR') : l('USER_FORM->INVALID_ERROR')}</p> : null}
                    </div>

                    <div className={middleName.error ? styles.error : ""}>
                        <label htmlFor="middleName">{l('USER_FORM->MIDDLE_NAME')}:</label>
                        <input name="middleName" id="middleName" type="text" />
                        {middleName.error ? <p>{middleName.required ? l('USER_FORM->REQUIRED_ERROR') : l('USER_FORM->INVALID_ERROR')}</p> : null}
                    </div>

                    <div className={lastName.error ? styles.error : ""}>
                        <label htmlFor="lastName">{l('USER_FORM->LAST_NAME')}:</label>
                        <input name="lastName" id="lastName" type="text"/>
                        {lastName.error ? <p>{lastName.required ? l('USER_FORM->REQUIRED_ERROR') : l('USER_FORM->INVALID_ERROR')}</p> : null}
                    </div>

                    <div className="buttons">
                        <input type="submit" value={(user && updateUser) ? l('USER_FORM->UPDATE_BUTTON') : l('USER_FORM->ADD_BUTTON')} />
                        {linkToAccounts}
                    </div>
                </fieldset>
            </form>
        );
    }
}

export default FormUser;
