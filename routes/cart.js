const express = require('express');
const router = express.Router();
let Middleware = require('../models/middleware');

// 購物車頁面
router.get('/cart', Middleware.checkLoginMiddleware, (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    const Url = `https://${process.env.RAILWAY_URL}` || "http://127.0.0.1:3000"; // 使用 Railway URL 或者默認的本地 URL
    res.render('cart', Url);
});

// 前端獲取session的cart資料。
router.get('/fetch/cart', Middleware.checkLoginMiddleware, (req, res, next) => {
    const { food } = req.session;
    // keys.splice(keys.length - 1, 1); 刪除陣列尾部
    res.json(req.session.cart);
});

// 獲取餐點內容，傳回Session的cart資料庫。
router.post('/fetch/cart', Middleware.checkLoginMiddleware, (req, res, next) => {
    const { body } = req;
    const { cart } = req.session;

    //keys是前端回傳的索引值，索引指向session.cart的位置。
    const keys = Object.keys(body);
    // cartKeys是session.cart的json數列裡面的主鍵。
    const cartKeys = Object.keys(cart);
    // 找出session.cart在keys位置的主鍵名稱，也就是食物名稱。
    const foodname = cartKeys[keys];
    // 食物的訂餐數量
    const values = parseInt(Object.values(body));

    // req.session.cart[foodname][0]是存放食物的訂餐數量，req.session.cart[foodname][1]是食物的價格
    req.session.cart[foodname][0] += values;
    req.session.food[foodname][0] = req.session.cart[cartKeys[keys]][0];
    if (req.session.cart[foodname][0] == 0) {
        delete req.session.cart[foodname];
    }

    res.json(req.session.cart);
});
module.exports = router;