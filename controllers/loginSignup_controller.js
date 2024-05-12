const login_signup_Function = require('../services/login_signup_service');

// get註冊頁面，使帳號密碼為空。
const renderSignupPage = (req, res) => {
    res.render('signUp', { tempAccount: '', errorMes: ' ' });
};

/* post註冊頁面上傳資料，接收到使用者帳密給login_signup_Function進行處理，成功則跳轉到成功首頁
，失敗則顯示相應的錯誤，並把使用者輸入過的帳號顯示在螢幕。 */
const registerUser = async (req, res) => {
    try {
        await login_signup_Function.registerUser(req.body);
        res.redirect('login');
    } catch (error) {
        res.status(error.status);
        res.render('signUp', { tempAccount: req.body.account, errorMes: error.message });
    }
};

// get登入頁面，使帳號密碼為空。
const renderLoingPage = (req, res) => {
    res.render('login', { tempAccount: '', errorMes: '' });
}

/* post登入頁面上傳資料，接收到使用者帳密給login_signup_Function進行處理，成功則跳轉到成功首頁
，並設置session方便檢測登入狀態，失敗則顯示相應的錯誤，並把使用者輸入過的帳號顯示在螢幕。 */
const loginUser = async (req, res) => {
    try {
        await login_signup_Function.loginUser(req)
        res.redirect('/');
    } catch (error) {
        res.status(error.status);
        res.render('login', { tempAccount: req.body.account, errorMes: error.message });
    }

}

// 登出並顯示登入頁面
const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('login');
    });
}

module.exports = {
    renderSignupPage,
    registerUser,
    renderLoingPage,
    loginUser,
    logout
};