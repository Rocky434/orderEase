const updateSession_service = require('../services/updateSession_service');


// 跳轉到首頁
const rendirectToIndex = (req, res) => {
    res.redirect('index');
}


// 首頁，設置無緩存，
const renderIndex = (req, res) => {
    const Url = (process.env.URL) ? `https://${process.env.URL}` : "http://127.0.0.1:3000"; // 使用 Railway URL 或者默認的本地 URL
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.render('index', { ...req.session.food, Url });
}

// 獲取餐點內容，傳回Session的food資料庫。
const updataCartItemQuentity = async (req, res) => {
    await updateSession_service.updataCartItemQuentity(req);
    res.json(req.session.food);
}

module.exports = {
    rendirectToIndex,
    renderIndex,
    updataCartItemQuentity
};