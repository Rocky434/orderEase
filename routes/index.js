const cart = require('./cart');
const home = require('./home');
const loginSignup = require('./loginSignup');
const orderRecords = require('./orderRecords');
const store = require('./store');
const linepay = require('./linepay');
const express = require('express');
const router = express.Router();

const routes = [
    {
        path: '/linepay',
        route: linepay
    },
    {
        path: '/cart',
        route: cart
    },
    {
        path: '/',
        route: home
    },
    {
        path: '/',
        route: loginSignup
    },
    {
        path: '/',
        route: orderRecords
    },
    {
        path: '/store',
        route: store
    },
];

for (const route of routes) {
    router.use(route.path, route.route);
}

module.exports = router;