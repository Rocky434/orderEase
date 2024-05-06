const { default: mongoose } = require('mongoose');
const orderRecordsModel = require('./dbModel/orderRecordsModel');
const accountModel = require('./dbModel/accountModel');
async function getPendingOrderRecords() {
    const pendingOrders = await orderRecordsModel.find({ expiration: false });
    return pendingOrders;
}

async function getCompletedOrderRecords() {
    const completedOrders = await orderRecordsModel.find({ expiration: true })
    return completedOrders;
}

async function setExpiration(orderRecord) {
    await orderRecord.updateOne({ expiration: true })
    await accountModel.updateOne(
        { 'OrderRecords.id': orderRecord.id },
        { $set: { 'OrderRecords.$.expiration': true } }
    );
}

async function setCompletedOrder(req) {
    const key = Object.keys(req.body);
    const pendingOrders = await getPendingOrderRecords();
    await setExpiration(pendingOrders.reverse()[key]);
    return pendingOrders.reverse()[key];
}

module.exports = { getCompletedOrderRecords, setCompletedOrder, getPendingOrderRecords };