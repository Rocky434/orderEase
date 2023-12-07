const express = require('express');
const router = express.Router();
const login_signup_Function = require('../models/login_signup_Function');

// 註冊頁面，使帳號密碼為空。
router.get('/signUp', (req, res) => {
    res.render('signUp', { tempAccount: '', errorMes: ' ' });
});

/* 註冊頁面上傳資料，接收到使用者帳密給login_signup_Function進行處理，成功則跳轉到成功首頁
，失敗則顯示相應的錯誤，並把使用者輸入過的帳號顯示在螢幕。 */
router.post('/signUp', (req, res, next) => {
    login_signup_Function.registerUser(req.body)
        .then((message) => {
            res.redirect(message.page);
        })
        .catch((message) => {
            res.render(message.page, { tempAccount: req.body.account, errorMes: message.error });
        });
});

// 登入頁面，使帳號密碼為空。
router.get('/login', (req, res) => {
    res.render('login', { tempAccount: '', errorMes: '' });
});

/* 登入頁面上傳資料，接收到使用者帳密給login_signup_Function進行處理，成功則跳轉到成功首頁
，並設置session方便檢測登入狀態，失敗則顯示相應的錯誤，並把使用者輸入過的帳號顯示在螢幕。 */
router.post('/login', (req, res) => {
    login_signup_Function.loginUser(req.body)
        .then((message) => {
            req.session.sid = message.id;
            req.session.cart = {};
            req.session.food = { salad: [0, 60], steak: [0, 220], salmon: [0, 250] };
            res.redirect(message.page);
        })
        .catch((message) => {
            res.render(message.page, { tempAccount: req.body.account, errorMes: message.error });
        });
});

// 登出並顯示登入頁面
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('login');
    });
})

module.exports = router;