const orderRecords_service = require('../services/orderRecords_service');
const updateSession_service = require('../services/updateSession_service');

// 渲染購物車頁面，設定無快取，在按上一頁時需重新跟發伺服器請求。
const renderCartPage = (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    const Url = (process.env.RAILWAY_URL) ? `https://${process.env.RAILWAY_URL}` : "http://127.0.0.1:3000"; // 使用 Railway URL 或者默認的本地 URL
    res.render('cart', { Url });
};

// 提交購物車時執行，新增訂單，將訂單存在客戶與店家資料庫中。
const addOrderRecords = async (req, res, next) => {
    try {
        await orderRecords_service.addOrderRecords(req);
        res.json({ url: `Records` });
    } catch (error) {
        console.log(error);
    }
}


// get前端獲取session的cart資料。
const getSessionFood = (req, res, next) => {
    res.json(req.session.food);
}

// patch當購物車內的餐點數量有變動時執行，將餐點內容傳給Session的cart資料集。
const updataCartItemQuentity = (req, res, next) => {
    updateSession_service.updateCartAndFoodItemQuentity(req);
    res.json(req.session.food);
}

module.exports = {
    renderCartPage,
    addOrderRecords,
    getSessionFood,
    updataCartItemQuentity
};