const express = require('express');
const router = express.Router();
let Middleware = require('../models/middleware');
const { addOrderRecords } = require('../models/orderRecords');
const { updateCartAndFoodItemQuentity } = require('../models/updateSession');

// 渲染購物車頁面，設定無快取，在按上一頁時需重新跟發伺服器請求。
router.get('/cart', Middleware.checkLoginMiddleware, (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    const Url = (process.env.RAILWAY_URL) ? `https://${process.env.RAILWAY_URL}` : "http://127.0.0.1:3000"; // 使用 Railway URL 或者默認的本地 URL
    res.render('cart', { Url });
});

// 提交購物車時執行，新增訂單，將訂單存在客戶與店家資料庫中。
router.post('/fetch/cart/order', Middleware.checkLoginMiddleware, async (req, res, next) => {
    try {
        await addOrderRecords(req);
        res.json({ url: `Records` });
    } catch (error) {
        console.log(error);
    }
});

// 前端獲取session的cart資料。
router.get('/fetch/cart', Middleware.checkLoginMiddleware, (req, res, next) => {
    res.json(req.session.food);
});


// 當購物車內的餐點數量有變動時執行，將餐點內容傳給Session的cart資料集。
router.patch('/fetch/cart', Middleware.checkLoginMiddleware, (req, res, next) => {
    updateCartAndFoodItemQuentity(req);
    res.json(req.session.food);
});

module.exports = router;