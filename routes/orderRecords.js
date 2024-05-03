const express = require('express');
const router = express.Router();
const Middleware = require('../models/middleware');
const { getOrderRecords } = require('../models/orderRecords');


// 渲染客戶的歷史訂單。
router.get('/Records', Middleware.checkLoginMiddleware, async (req, res, next) => {
    const Url = (process.env.RAILWAY_URL) ? `https://${process.env.RAILWAY_URL}` : "http://127.0.0.1:3000"; // 使用 Railway URL 或者默認的本地 URL
    try {
        const orderRecords = await getOrderRecords(req)
        let currentTime = new Date()
        res.render('orderRecords', { orderRecords, currentTime, Url });
    } catch (error) {
        res.status(error.status);
    }
});

// 傳遞session
router.get('/fetch/clientSid', (req, res, next) => {
    res.json(req.session);
});

// 轉址
router.get('/fetch/decreaseOrderTime', Middleware.checkLoginMiddleware, (req, res, next) => {
    res.redirect('/Records');
});
module.exports = router;  