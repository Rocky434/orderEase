const express = require('express');
const router = express.Router();
const Middleware = require('../middleware/identify');
const store_controller = require('../controllers/store_controller');

router
    .route('/index')
    .get(Middleware.checkIsStore, store_controller.renderStoreIndex)

router
    .route('/orderRecord')
    .get(Middleware.checkIsStore, store_controller.renderStoreOderRecords)

router
    .route('/pendingOrder')
    .get(Middleware.checkIsStore, store_controller.renderPendingOrderRecords)

router
    .route('/fetch/getStoreId')
    .get(Middleware.checkIsStore, store_controller.getSession)

router
    .route('/fetch/setCompletedOrder')
    .patch(Middleware.checkIsStore, store_controller.setCompletedOrder)

module.exports = router;