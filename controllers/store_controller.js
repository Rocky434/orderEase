const store_service = require('../services/store_service')
const Url = (process.env.URL) ? `https://${process.env.URL}` : "http://127.0.0.1:3000"; // 使用 Railway URL 或者默認的本地 URL


//渲染店家的首頁
const renderStoreIndex = (req, res) => {
    res.render('storeIndex', { ...req.session.food, Url });
}


//渲染店家的歷史訂單紀錄，且設定無快取。
const renderStoreOderRecords = async (req, res) => {
    try {
        const completedOrders = await store_service.getCompletedOrderRecords(req);
        let currentTime = new Date();
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.render('storeOrderRecord', { completedOrders, currentTime });
    }
    catch (error) {
        console.log(error);
    }
}


//渲染店家訂單處理頁面，且設定無快取。
const renderPendingOrderRecords = async (req, res) => {
    try {
        const pendingOrders = await store_service.getPendingOrderRecords();
        let currentTime = new Date();
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.render('pendingOrder', { pendingOrders, currentTime, Url });
    } catch (error) {
        console.log(error);
    }
}


//給予StoreId
const getSession = (req, res) => {
    res.json(req.session);
}


//當訂單完成，設定expiration為false，以代表訂單已處理完成。
const setCompletedOrder = async (req, res) => {
    try {
        const completedOrder = await store_service.setCompletedOrder(req);
        res.json(completedOrder);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    renderStoreIndex,
    renderStoreOderRecords,
    renderPendingOrderRecords,
    getSession,
    setCompletedOrder
};