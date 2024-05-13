const errors = {
    accountTooShort: { status: 410, message: '帳戶至少8個字' },
    accountNotFound: { status: 411, message: '找不到帳戶' },
    accountAlreadyExists: { status: 412, message: '帳號已註冊過' },
    passwordTooShort: { status: 413, message: '密碼至少8個字' },
    unknownError: { status: 414, message: '錯誤' },
    accountNotExist: { status: 415, message: '帳號不存在' },
    incorrectPassword: { status: 416, message: '密碼錯誤' },
    orderNotFound: { status: 417, message: '找不到訂單' },
};
module.exports = errors;