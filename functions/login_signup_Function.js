const { default: mongoose } = require('mongoose');
const accountModel = require('../models/accountModel');
const db = require('../db/db');
const md5 = require('md5');

let message = { status: 200, message: '', account: '', page: '', error: '', id: '' };

const isAccountValid = (account) => {
    return new Promise((resolve, reject) => {
        if (account.length >= 8) {
            resolve();
        }
        else {
            reject({ status: 410, message: '帳戶至少8個字' });
        }
    });
};

const isAccountUnique = (account) => {
    return accountModel.findOne({ account })
        .then(existingAccount => {
            if (existingAccount)
                return Promise.reject({ status: 412, message: '帳號已註冊過' });
        });
}

const isPasswordValid = (password) => {
    return new Promise((resolve, reject) => {
        if (password.length >= 8) {
            resolve();
        }
        else {
            reject({ status: 413, message: '密碼至少8個字' });
        }
    });
};

const createAccount = (account, password) => {
    password = md5(password);
    const Account = new accountModel({ account, password });
    return Account.save();
}

const handleSuccess = (page) => {
    message.page = page;
}

const handleError = (error, page) => {
    message.page = page;
    message.account = error.account;
    if (error.status) {
        // res.render('signUp', { tempAccount: error.account, errorMes: error.message });
        message.status = error.status;
        message.error = error.message;
    }
    else {
        console.log(error);
        //res.render('signUp', { tempAccount: error.account, errorMes: '錯誤' });
        message.status = 414;
        message.error = '錯誤';
    }
}

const isAccountExisting = (account) => {
    return accountModel.findOne({ account: account }).exec()
        .then((value) => {
            if (!value) {
                return Promise.reject({ status: 415, message: '帳號不存在' });
            }
        });
};

const isPasswordExsisting = (account, password) => {
    return accountModel.findOne({ account: account, password: md5(password) }).exec()
        .then((value) => {
            if (!value) {
                return Promise.reject({ status: 416, message: '密碼錯誤' });
            }
            else {
                message.id = value._id;
            }
        });
};

const disconnect = () => {
    mongoose.disconnect();

}

const registerUser = (req_body) => {
    const { account, password } = req_body;
    return new Promise((resolve, reject) => {
        db()
            .then(() => isAccountValid(account))  // Check account length
            .then(() => isAccountUnique(account)) // Check if account is unique
            .then(() => isPasswordValid(password))
            .then(() => createAccount(account, password)) // Create account
            .then(() => {
                handleSuccess('login');
                resolve(message);
            })
            .catch((error) => {
                handleError(error, 'signUp');
                reject(message);
            })
            .finally(disconnect);

    });
}

const loginUser = (req_body) => {
    const { account, password } = req_body;

    return new Promise((resolve, reject) => {
        db()
            .then(() => isAccountValid(account))
            .then(() => isPasswordValid(password))
            .then(() => isAccountExisting(account))
            .then(() => isPasswordExsisting(account, password))
            .then(() => {
                handleSuccess('/');
                resolve(message);
            })
            .catch((error) => {
                handleError(error, 'login');
                reject(message);
            })
            .finally(disconnect);
    });
}

module.exports = {
    registerUser,
    loginUser
};