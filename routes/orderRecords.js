const express = require('express');
const router = express.Router();
const Middleware = require('../middleware/identify');
const orderRecords_controller = require('../controllers/orderRecords_controller');

router
    .route('/Records')
    .get(Middleware.checkLogin, orderRecords_controller.renderRecords)


router
    .route('/fetch/clientSid')
    .get(orderRecords_controller.getSession)


router
    .route('/fetch/decreaseOrderTime')
    .get(Middleware.checkLogin, orderRecords_controller.redirectToRecords)

module.exports = router;  