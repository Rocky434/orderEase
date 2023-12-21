// 確認使用者有沒有session，來檢測是否登入，沒登入就自動重定向到登入頁面。
let checkLoginMiddleware = (req, res, next) => {
    if (!req.session.sid) {
        return res.redirect('/login');
    }
    if (req.session.sid === '658452b31576e44088148cc6') {
        return res.redirect('/store/storeIndex');
    }
    next();
}
let checkIsStoreMiddleware = (req, res, next) => {
    if (!req.session.sid) {
        return res.redirect('/login');
    }
    else if (req.session.sid !== '658452b31576e44088148cc6') {
        return res.redirect('/error');
    }
    next();
}
module.exports = {
    checkLoginMiddleware,
    checkIsStoreMiddleware
}