const express = require('express');
const router = express.Router();
const Middleware = require('../models/middleware');
const { setCompletedOrder, getCompletedOrderRecords, getPendingOrderRecords } = require('../models/store');
const Url = (process.env.RAILWAY_URL) ? `https://${process.env.RAILWAY_URL}` : "http://127.0.0.1:3000"; // 使用 Railway URL 或者默認的本地 URL

//渲染店家的首頁
router.get('/storeIndex', (req, res, next) => {
    res.render('storeIndex', { ...req.session.food, Url });
})

//渲染店家的歷史訂單紀錄，且設定無快取。
router.get('/storeOrderRecord', async (req, res, next) => {
    try {
        const completedOrders = await getCompletedOrderRecords(req);
        let currentTime = new Date();
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.render('storeOrderRecord', { completedOrders, currentTime });
    }
    catch (error) {
        console.log(error);
    }
});

//渲染店家訂單處理頁面，且設定無快取。
router.get('/pendingOrder', async (req, res, next) => {
    try {
        const pendingOrders = await getPendingOrderRecords();
        let currentTime = new Date();
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.render('pendingOrder', { pendingOrders, currentTime, Url });
    } catch (error) {
        console.log(error);
    }
});

//給予StoreId
router.get('/fetch/getStoreId', (req, res, next) => {
    res.json(req.session);
});

//當訂單完成，設定expiration為false，以代表訂單已處理完成。
router.patch('/fetch/setCompletedOrder', async (req, res, next) => {
    try {
        const completedOrder = await setCompletedOrder(req);
        res.json(completedOrder);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;