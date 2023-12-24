const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const fs = require('fs');
const path = require('path');
let Middleware = require('../models/middleware');

// 跳轉到首頁
router.get('/', Middleware.checkLoginMiddleware, (req, res, next) => {
  res.redirect('index');
});

// 首頁，設置無緩存，
router.get('/index', Middleware.checkLoginMiddleware, (req, res) => {
  const Url = process.env.RAILWAY_URL || "http://127.0.0.1:3000"; // 使用 Railway URL 或者默認的本地 URL
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.render('index', { ...req.session.food, Url });
});

// 獲取餐點內容，傳回Session的food資料庫。
router.post('/fetch/index', (req, res, next) => {
  const { body } = req;
  const keys = Object.keys(body);
  const value = parseInt(Object.values(body));
  if (req.session.food[keys][0] + value >= 0) {
    req.session.food[keys][0] += value;
    if (req.session.food[keys][0] > 0) {
      if (!req.session.cart[keys]) {
        req.session.cart[keys] = [];
      }
      req.session.cart[keys][0] = req.session.food[keys][0];
      req.session.cart[keys][1] = req.session.food[keys][1];
    }
  }
  res.json(req.session.food);
});






module.exports = router;  