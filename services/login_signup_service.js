const mongoose = require('mongoose');
const accountModel = require('../models/accountModel');
const md5 = require('md5');
const errors = require('../config/errorMessage')


// 註冊帳戶函式
const registerUser = async (req_body) => {
    const { account, password } = req_body;
    await isAccountValid(account);
    await isAccountUnique(account);
    await isPasswordValid(password);
    await createAccount(account, password);
};

// 登入帳號函式
const loginUser = async (req) => {
    const { account, password } = req.body;
    await isAccountValid(account);
    await isPasswordValid(password);
    await isAccountExisting(account);
    const accountId = await isPasswordExsisting(account, password);
    await createSession(req, accountId);
};

// 創建session，設定session.id與accountid一致。
const createSession = async (req, accountId) => {
    req.session.sid = accountId;
    req.session.food = { salad: [0, 60], steak: [0, 220], salmon: [0, 250] };
}

// 創建帳戶
const createAccount = async (account, password) => {
    password = md5(password);
    const Account = new accountModel({ Account: account, Password: password, OrderRecords: [] });
    Account.save();
}

// 檢測帳號長度
const isAccountValid = async (account) => {
    if (account.length < 8) {
        throw errors.accountTooShort;
    }
};

// 檢測密碼長度
const isPasswordValid = async (password) => {
    if (password.length < 8) {
        throw errors.passwordTooShort;
    }
};

// 檢測帳號是否唯一
const isAccountUnique = async (account) => {
    const existingAccount = await accountModel.findOne({ Account: account });
    if (existingAccount) {
        throw errors.accountAlreadyExists;
    }
};

// 檢測帳號是否存在
const isAccountExisting = async (account) => {
    const existingAccount = await accountModel.findOne({ Account: account });
    if (!existingAccount) {
        throw errors.accountNotExist;
    }
};

// 檢測密碼是否正確，返回帳戶id。
const isPasswordExsisting = async (account, password) => {
    const existingAccount = await accountModel.findOne({ Account: account, Password: md5(password) });
    if (!existingAccount) {
        throw errors.incorrectPassword;
    } else {
        return existingAccount._id;
    }
};

module.exports = {
    registerUser,
    loginUser
};
