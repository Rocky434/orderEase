const express = require('express');
const router = express.Router();
const Middleware = require('../models/middleware');
const { addOrderRecords, getOrderRecords } = require('../models/orderRecords');


// 訂餐紀錄頁面
router.get('/fetch/addOrder', Middleware.checkLoginMiddleware, (req, res, next) => {
    addOrderRecords(req)
        .then((orderId) => {
            res.json({ url: `Records`, orderId });
        }).catch((err) => {
            console.log(err);
        });
});

router.get('/fetch/decreaseOrderTime', Middleware.checkLoginMiddleware, (req, res, next) => {
    res.redirect('/Records');
});

router.get('/Records', Middleware.checkLoginMiddleware, (req, res, next) => {
    const Url = process.env.RAILWAY_URL || "http://127.0.0.1:3000"; // 使用 Railway URL 或者默認的本地 URL

    getOrderRecords(req)
        .then((orderRecords) => {
            let currentTime = new Date();
            res.render('orderRecords', { orderRecords, currentTime, Url });
        }).catch((err) => {

        });

});
router.get('/fetch/clientSid', (req, res, next) => {
    res.json(req.session);
});
module.exports = router;  