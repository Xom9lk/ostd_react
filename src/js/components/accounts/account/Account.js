/**
 * Created by Игорь on 03.01.2016.
 */
import React, { Component, PropTypes } from 'react';
import shouldComponentUpdate from 'react-pure-render/function';
import styles from './Account.scss';

class Account extends Component {
    static displayName = "Account";
    shouldComponentUpdate  = shouldComponentUpdate;

    static propTypes = {
        account: PropTypes.object.isRequired,
        l: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired
    };

    componentDidMount () {
        const {account} = this.props;
        if (account) {
            this.refs.account.iban.value = account.iban;
            this.refs.account.bic.value = account.bic;
        }
    }

    /**
     * @param {Event} event
     * */
    onSubmit (event) {
        event.preventDefault();
    }


    /**
     * @param {Event} event
     * */
    deleteLink = (event) => {
        event.preventDefault();

        const {onDelete, account} = this.props;

        if (onDelete && typeof onDelete === 'function') {
            onDelete(account.uid, account.id);
        }
    };

    render () {
        const {account, l} = this.props;
        const {uid} = account;
        let iban = null,
            bic = null;

        if (account.validationResult) {
            if (account.validationResult.iban.error) {
                iban = account.validationResult.iban;
            }

            if (account.validationResult.bic.error) {
                bic = account.validationResult.bic;
            }
        }
        return (
            <form className={styles.form} ref="account" onSubmit={this.onSubmit} method="post">
                <fieldset>
                    <legend className={styles.header}>{l('ACCOUNT_FORM->HEADER')}</legend>

                    <div className={iban ? styles.error : ""}>
                        <label htmlFor={`iban-${uid}`}>{l('ACCOUNT_FORM->IBAN')}:</label>
                        <input name="iban" id={`iban-${uid}`} type="text"/>
                        {iban ? <p>{iban.required ? l('ACCOUNT_FORM->REQUIRED_ERROR') : l('ACCOUNT_FORM->INVALID_ERROR')}</p> : null}
                    </div>

                    <div className={bic ? styles.error : ""}>
                        <label htmlFor={`bic-${uid}`}>{l('ACCOUNT_FORM->BIC')}:</label>
                        <input name="bic" id={`bic-${uid}`} type="text"/>
                        {bic ? <p>{bic.required ? l('ACCOUNT_FORM->REQUIRED_ERROR') : l('ACCOUNT_FORM->INVALID_ERROR')}</p> : null}
                    </div>
                    <input type="hidden" name="uid" value={uid}/>

                    <div className="buttons">
                        <button onClick={this.deleteLink}>{l('ACCOUNT_FORM->DELETE_LINK')}</button>
                    </div>
                </fieldset>
            </form>
        );
    }
}

export default Account;
