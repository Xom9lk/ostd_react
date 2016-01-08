/**
 * Created by Игорь on 05.01.2016.
 */

export function getLanguage() {
    return new Promise(
        function (resolve, reject) {
            let language = localStorage.getItem('language');
            if (language) {
                let response = {
                    data: {language},
                    status: 200,
                    statusText: 'OK'
                };
                resolve(response);
            } else {
                let error = {
                    status: 404,
                    statusText: 'Not Found'
                };
                reject(error);
            }
        }
    );
}

export function setLanguage(language) {
    return new Promise(
        function (resolve) {
            localStorage.setItem('language', language);
            let response = {
                data: {language},
                status: 200,
                statusText: 'OK'
            };
            resolve(response);
        }
    );
}

export function getUsers() {
    return new Promise(
        function (resolve) {
            let users = localStorage.getItem('users');
            if (!users) {
                users = '[]';
            }

            users = JSON.parse(users);
            if (!Array.isArray(users)) {
                users = [];
            }
            let response = {
                data: {users},
                status: 200,
                statusText: 'OK'
            };
            resolve(response);
        }
    );
}

export function addUser(user) {
    return new Promise(
        function (resolve) {
            let users = localStorage.getItem('users');
            if (!users) {
                users = '[]';
            }

            users = JSON.parse(users);
            if (!Array.isArray(users)) {
                users = [];
            }

            user.id = !users.length ? 1 : Math.max.apply(null, users.map(d => +d.id)) + 1;
            users.push(user);

            localStorage.setItem('users', JSON.stringify(users));
            const response = {
                data: {user},
                status: 200,
                statusText: 'OK'
            };

            resolve(response);
        }
    );
}

export function updateUser(user) {
    return new Promise(
        function (resolve) {
            let users = localStorage.getItem('users');
            if (!users) {
                users = '[]';
            }

            users = JSON.parse(users);
            if (!Array.isArray(users)) {
                users = [];
            }

            users = users.map(d => d.id === user.id ? user : d);

            localStorage.setItem('users', JSON.stringify(users));
            const response = {
                data: {user},
                status: 200,
                statusText: 'OK'
            };

            resolve(response);
        }
    );
}

export function updateUserAccounts (user, accounts) {
    return new Promise(
        function (resolve) {
            let users = localStorage.getItem('users');
            if (!users) {
                users = '[]';
            }

            users = JSON.parse(users);
            if (!Array.isArray(users)) {
                users = [];
            }

            let u = users.filter(d => d.id === user.id)[0];
            if (u) {
                if (!u.accounts || u.accounts && !Array.isArray(u.accounts)) {
                    u.accounts = [];
                }

                accounts = accounts.map(account => {
                    account = {...account};
                    delete account.uid;
                    delete account.validationResult;

                    if (account.id) {
                        u.accounts = u.accounts.map(d => d.id === account.id ? account : d);
                    } else {
                        account.id = !u.accounts.length ? 1 : Math.max.apply(null, u.accounts.map(d => +d.id)) + 1;
                        u.accounts.push(account);
                    }

                    return account;
                });

                u.accounts = u.accounts.filter(account => {
                    delete account.uid;
                    delete account.validationResult;

                    if (account.id) {
                        return !!accounts.filter(d => d.id === account.id).length;
                    } else {
                        return false;
                    }
                });
            }

            localStorage.setItem('users', JSON.stringify(users));
            const response = {
                data: {user: u},
                status: 200,
                statusText: 'OK'
            };

            resolve(response);
        }
    );
}

export function deleteUser(id) {
    return new Promise(
        function (resolve, reject) {
            let users = localStorage.getItem('users');
            if (!users) {
                users = '[]';
            }

            users = JSON.parse(users);
            if (!Array.isArray(users)) {
                users = [];
            }
            let response = {
                status: 200,
                statusText: 'OK'
            };

            if (!users.filter(user => user.id === id)[0]) {
                response = {
                    status: 404,
                    statusText: 'Not found'
                };
            } else {
                users = users.filter(user => user.id !== id);
                localStorage.setItem('users', JSON.stringify(users));
            }
            if (response.status === 200) {
                resolve(response);
            } else {
                reject(response);
            }
        }
    );
}