const cart = require('./cart');
const home = require('./home');
const loginSignup = require('./loginSignup');
const orderRecords = require('./orderRecords');
const store = require('./store');
const express = require('express');
const router = express.Router();

const routes = [
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