const express = require('express');
const router = express.Router();
const Middleware = require('../middleware/identify');
const cart_controller = require('../controllers/cart_controller')
const linepay_controllers = require('../controllers/linepay_controllers')

router
    .route('/')
    .get(Middleware.checkLogin, cart_controller.renderCartPage)

router
    .route('/fetch/order')
    .get(Middleware.checkLogin, linepay_controllers.linePayRequest)

router
    .route('/fetch')
    .get(Middleware.checkLogin, cart_controller.getSessionFood)
    .patch(Middleware.checkLogin, cart_controller.updataCartItemQuentity)

module.exports = router;