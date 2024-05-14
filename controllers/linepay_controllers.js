
const { createHeaders } = require('../services/linepay_service');
const orderRecords_service = require('../services/orderRecords_service');
const axios = require('axios');
const { Line_Url, Line_Version } = process.env;

const linePayRequest = async (req, res) => {
    try {
        const Url = (process.env.ENV_URL) ? `https://${process.env.ENV_URL}` : "http://127.0.0.1:3000";
        const uri = '/payments/request';
        const url = `${Line_Url}${Line_Version}${uri}`;
        const order = await orderRecords_service.getOrder(req);
        const linePayBody = {
            amount: order.amount,
            currency: "TWD",
            orderId: order.id,
            packages: [
                {
                    id: "1",
                    amount: order.amount,
                    products: [...order.foods
                    ]
                }
            ],
            redirectUrls: {
                confirmUrl: `${Url}/linePay/confirm`,
                cancelUrl: `${Url}/linePay/cancel`
            }
        };
        const headers = await createHeaders(uri, JSON.stringify(linePayBody));
        const lineRes = await axios.post(url, linePayBody, { headers });

        if (lineRes?.data?.returnCode === '0000') {
            await orderRecords_service.addOrderToDatabase(req, order);
            res.json({ url: lineRes?.data?.info.paymentUrl.web });
        } else {
            console.log('lineReturnCode', lineRes?.data?.returnCode);
        }
    } catch (error) {
        console.log('error', error);
        res.status(500).json(error.response.data);
    }
}

const linePayConfirm = async (req, res) => {
    try {
        const { transactionId, orderId } = req.query;
        const uri = `/payments/${transactionId}/confirm`;
        const url = `${Line_Url}${Line_Version}${uri}`;
        const order = await orderRecords_service.findOrderById(orderId);
        const linePayBody = {
            amount: order[0].amount,
            currency: 'TWD'
        };
        const headers = await createHeaders(uri, JSON.stringify(linePayBody));
        const lineRes = await axios.post(url, linePayBody, { headers });
        if (lineRes?.data?.returnCode === '0000') {
            res.redirect('/Records');
        } else {
            console.log('fail', lineRes?.data?.returnCode);
        }
        res.end()
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    linePayRequest,
    linePayConfirm
};