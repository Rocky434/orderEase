const express = require('express');
const router = express.Router();
const Middleware = require('../models/middleware');
const { addOrderRecords, getOrderRecords } = require('../models/orderRecords');



router.get('/fetch/decreaseOrderTime', Middleware.checkLoginMiddleware, (req, res, next) => {
    res.redirect('/Records');
});

//渲染客戶的歷史訂單。
router.get('/Records', Middleware.checkLoginMiddleware, (req, res, next) => {
    const Url = (process.env.RAILWAY_URL) ? `https://${process.env.RAILWAY_URL}` : "http://127.0.0.1:3000"; // 使用 Railway URL 或者默認的本地 URL
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