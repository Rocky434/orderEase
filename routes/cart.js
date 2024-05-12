const express = require('express');
const router = express.Router();
const Middleware = require('../middleware/identify');
const cart_controller = require('../controllers/cart_controller')

router
    .route('/')
    .get(Middleware.checkLogin, cart_controller.renderCartPage)

router
    .route('/fetch/order')
    .post(Middleware.checkLogin, cart_controller.addOrderRecords)

router
    .route('/fetch')
    .get(Middleware.checkLogin, cart_controller.getSessionFood)
    .patch(Middleware.checkLogin, cart_controller.updataCartItemQuentity)

module.exports = router;