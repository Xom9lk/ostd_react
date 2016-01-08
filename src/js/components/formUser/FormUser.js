/**
 * Created by Игорь on 03.01.2016.
 */
import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';
import {validateUserForm} from './../../utils/validators.js';
import * as API from './../../utils/API.js';
import getPathForUrl from './../../utils/getPathForUrl.js';
import { Link } from 'react-router';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialValidationResults();
    }
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

    static contextTypes = {
        l: PropTypes.func.isRequired
    };

    static propTypes = {
        addUser: PropTypes.func.isRequired,
        updateUser: PropTypes.func,
        user: PropTypes.object,
        dispatch: PropTypes.func.isRequired
    };

    /**
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
            form = {
                firstName: form.firstName.value,
                middleName: form.middleName.value,
                lastName: form.lastName.value
            };
            const {user, updateUser, addUser} = this.props;

            if (user && updateUser) {
                form.id = user.id;
                API.updateUser(form).then((response) => {
                    updateUser(response.data.user);
                });
            } else {
                API.addUser(form).then((response) => {
                    addUser(response.data.user);
                });
            }
            this.setState(this.getInitialValidationResults());
        } else {
            this.setState({validationResult: validation.form});
        }
    };

    render () {
        const {l} = this.context;
        const {firstName, middleName, lastName} = this.state.validationResult;
        const {user, updateUser} = this.props;
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
        let linkToAccounts = null;
        if (user) {
            linkToAccounts = <Link className="btn" to={getPathForUrl(null, {accounts: true})}>{l('USER_FORM->LINK_TO_ACCOUNT')}</Link>;
        }
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

export default AddUser;
