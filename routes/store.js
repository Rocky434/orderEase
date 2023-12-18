const express = require('express');
const router = express.Router();
const Middleware = require('../models/middleware');
const { completedOrder, getCompletedOrderRecords, getPendingOrderRecords } = require('../models/store');

router.get('/storeIndex', (req, res, next) => {
    res.render('storeIndex', req.session.food);
})


router.get('/storeOrderRecord', (req, res, next) => {
    getCompletedOrderRecords(req)
        .then((orderRecords) => {
            let currentTime = new Date();
            res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.render('storeOrderRecord', { orderRecords, currentTime });
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

router.get('/fetch/getStoreId', (req, res, next) => {
    res.json(req.session);
});

router.post('/fetch/completedOrder', (req, res, next) => {
    const { body } = req;
    const key = Object.keys(body);
    completedOrder(req)
        .then((orderRecords) => {
            console.log("0   " + orderRecords.accountId);
            res.json(orderRecords);
        }).catch((err) => {
            console.log(err);
        });
});
module.exports = router;