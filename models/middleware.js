// 確認使用者有沒有session，來檢測是否登入，沒登入就自動重定向到登入頁面。
let checkLoginMiddleware = (req, res, next) => {
    if (!req.session.sid) {
        return res.redirect('login');
    }
    next();
}
module.exports = {
    checkLoginMiddleware
}