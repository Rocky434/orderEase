const express = require('express');
const router = express.Router();
const Middleware = require('../models/middleware');
const { completedOrder, getCompletedOrderRecords, getPendingOrderRecords } = require('../models/store');

router.get('/orderRecord', (req, res, next) => {
    getCompletedOrderRecords(req)
        .then((orderRecords) => {
            let currentTime = new Date();
            res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.render('storeOrder', { orderRecords, currentTime });
        }).catch((err) => {
            console.log(err);
        });
});

router.get('/pendingOrder', (req, res, next) => {
    getPendingOrderRecords(req)
        .then((orderRecords) => {
            let currentTime = new Date();
            res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.render('pendingOrder', { orderRecords, currentTime });
        }).catch((err) => {
            console.log(err);
        });
});

router.post('/fetch/completedOrder', (req, res, next) => {
    const { body } = req;
    const key = Object.keys(body);
    console.log(key);

    completedOrder(req)
        .then((orderRecords) => {
            res.json('成功');
        }).catch((err) => {
            console.log(err);
        });
});
module.exports = router;