const express = require('express');
const router = express.Router();
const linepay_controllers = require('../controllers/linepay_controllers')

router
    .route('/confirm')
    .get(linepay_controllers.linePayConfirm);
router
    .route('/cancel')
    .get(linepay_controllers.linePayCancel);
module.exports = router;