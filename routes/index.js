const express = require('express');
const router = express.Router();
let Middleware = require('../models/middleware');
const { updataCartItemQuentity } = require('../models/updateSession');


// 跳轉到首頁
router.get('/', Middleware.checkLoginMiddleware, (req, res, next) => {
  res.redirect('index');
});

// 首頁，設置無緩存，
router.get('/index', Middleware.checkLoginMiddleware, (req, res) => {
  const Url = (process.env.RAILWAY_URL) ? `https://${process.env.RAILWAY_URL}` : "http://127.0.0.1:3000"; // 使用 Railway URL 或者默認的本地 URL
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.render('index', { ...req.session.food, Url });
});

// 獲取餐點內容，傳回Session的food資料庫。
router.patch('/fetch/index', async (req, res, next) => {
  await updataCartItemQuentity(req);
  res.json(req.session.food);
});

module.exports = router;  