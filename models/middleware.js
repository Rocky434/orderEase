// 確認使用者有沒有session，來檢測是否登入，沒登入就自動重定向到登入頁面。
let checkLoginMiddleware = (req, res, next) => {
    if (!req.session.sid) {
        return res.redirect('/login');
    }
    if (req.session.sid === '663887bdc1c7bdcfb4178f8d') {
        return res.redirect('/store/storeIndex');
    }
    next();
}

// 識別是否為店家帳戶。
let checkIsStoreMiddleware = (req, res, next) => {
    if (!req.session.sid) {
        return res.redirect('/login')
    }
    else if (req.session.sid !== '663887bdc1c7bdcfb4178f8d') {
        return res.redirect('/error');
    }
    next();
}


module.exports = {
    checkLoginMiddleware,
    checkIsStoreMiddleware
}