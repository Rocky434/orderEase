const { getOrderRecords } = require('../services/orderRecords_service');


// 渲染客戶的歷史訂單。
const renderRecords = async (req, res) => {
    const Url = (process.env.ENV_URL) ? `https://${process.env.ENV_URL}` : "http://127.0.0.1:3000"; // 使用 Railway URL 或者默認的本地 URL
    try {
        const orderRecords = await getOrderRecords(req)
        let currentTime = new Date()
        res.render('orderRecords', { orderRecords, currentTime, Url });
    } catch (error) {
        res.status(error.status);
    }
};

// 傳遞session
const getSession = (req, res) => {
    res.json(req.session);
};

// 轉址
const redirectToRecords = (req, res) => {
    res.redirect('/Records');
}

module.exports = {
    renderRecords,
    getSession,
    redirectToRecords
};