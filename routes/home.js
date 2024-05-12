const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const Middleware = require('../middleware/identify');


router
    .route('/')
    .get(Middleware.checkLogin, homeController.rendirectToIndex)

router
    .route('/index')
    .get(Middleware.checkLogin, homeController.renderIndex)

router
    .route('/fetch/index')
    .patch(homeController.updataCartItemQuentity)

module.exports = router;  