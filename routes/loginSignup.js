const express = require('express');
const router = express.Router();
const loginSignup_controller = require('../controllers/loginSignup_controller')


router
    .route('/signUp')
    .get(loginSignup_controller.renderSignupPage)
    .post(loginSignup_controller.registerUser)


router
    .route('/login')
    .get(loginSignup_controller.renderLoingPage)
    .post(loginSignup_controller.loginUser)


router
    .route('/logout')
    .get(loginSignup_controller.logout)


module.exports = router;