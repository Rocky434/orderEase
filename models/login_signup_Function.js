const { default: mongoose } = require('mongoose');
const accountModel = require('./dbModel/accountModel');
const md5 = require('md5');

let message = { status: 200, message: '', account: '', page: '', error: '', id: '' };

// 檢測帳號是否超過7個字
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

// 檢測密碼是否超過7個字
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



//#region 註冊時所使用的函式
// 撿測帳號是否唯一
const isAccountUnique = (account) => {
    return accountModel.findOne({ Account: account })
        .then(existingAccount => {
            if (existingAccount)
                return Promise.reject({ status: 412, message: '帳號已註冊過' });
        });
}

// 在資料庫中，儲存帳號與加密後的密碼。
const createAccount = (account, password) => {
    password = md5(password);
    const Account = new accountModel({ Account: account, Password: password, OrderRecords: [] });
    return Account.save();
}
// 成功處理，接收成功後的跳轉頁面。
const handleSuccess = (page) => {
    message.page = page;
}
// 失敗處理，接收失敗後顯示的頁面資訊，有錯誤訊息與錯誤狀態。
const handleError = (error, page) => {
    message.page = page;
    message.account = error.account;
    if (error.status) {
        message.status = error.status;
        message.error = error.message;
    }
    else {
        console.log(error);
        message.status = 414;
        message.error = '錯誤';
    }
}

//#endregion



//#region 登入時所使用的函式
// 檢測帳號是否存在，
const isAccountExisting = (account) => {
    return accountModel.findOne({ Account: account }).exec()
        .then((value) => {
            if (!value) {
                return Promise.reject({ status: 415, message: '帳號不存在' });
            }
        });
};
// 檢查密碼是否存在，
const isPasswordExsisting = (account, password) => {
    return accountModel.findOne({ Account: account, Password: md5(password) }).exec()
        .then((value) => {
            if (!value) {
                return Promise.reject({ status: 416, message: '密碼錯誤' });
            }
            else {
                message.id = value._id;
            }
        });
};

//#endregion

const registerUser = (req_body) => {
    const { account, password } = req_body;
    return new Promise((resolve, reject) => {
        isAccountValid(account)  // Check account length
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
    });
}

const loginUser = (req_body) => {
    const { account, password } = req_body;
    return new Promise((resolve, reject) => {
        isAccountValid(account)
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

    });
}

module.exports = {
    registerUser,
    loginUser
};