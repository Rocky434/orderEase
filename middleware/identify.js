// 確認使用者有沒有session，來檢測是否登入，沒登入就自動重定向到登入頁面。
const { storeSessionID } = process.env;

const checkLogin = (req, res, next) => {
    if (!req.session.sid) {
        return res.redirect('/login');
    }
    if (req.session.sid === storeSessionID) {
        return res.redirect('/store/index');
    }
    next();
}

// 識別是否為店家帳戶。
const checkIsStore = (req, res, next) => {
    if (!req.session.sid) {
        return res.redirect('/login')
    }
    else if (req.session.sid !== storeSessionID) {
        return res.redirect('/error');
    }
    next();
}


module.exports = {
    checkLogin,
    checkIsStore
}