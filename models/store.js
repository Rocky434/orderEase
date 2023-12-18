const { default: mongoose } = require('mongoose');
const orderRecordsModel = require('./dbModel/orderRecordsModel');
const accountModel = require('./dbModel/accountModel');
function getPendingOrderRecords(req) {
    return new Promise((resolve, reject) => {
        orderRecordsModel.find({ expiration: false })
            .then((orderRecords) => {
                resolve(orderRecords);
            })
            .catch((err) => {
                // 处理错误
                reject(err);
                console.error(err);
            });
    });
}
function getCompletedOrderRecords(req) {
    return new Promise((resolve, reject) => {
        orderRecordsModel.find({ expiration: true })
            .then((orderRecords) => {
                resolve(orderRecords);
            })
            .catch((err) => {
                // 处理错误
                reject(err);
                console.error(err);
            });
    });
}
function setExpiration(orderRecord) {

    orderRecord.updateOne({ expiration: true })
        .then((result) => {
            console.log("成功更改店家端expiration");
        }).catch((err) => {
            console.log(err);
        });
    accountModel.updateOne(
        { 'OrderRecords.id': orderRecord.id },
        { $set: { 'OrderRecords.$[elem].expiration': true } },
        { arrayFilters: [{ 'elem.id': orderRecord.id }] }
    )
        .then(() => {
            console.log("1   " + orderRecord.id);
            console.log("成功更改客戶端expiration");
        })
        .catch((err) => {
            console.error(err);
        });
}
function completedOrder(req) {
    return new Promise((resolve, reject) => {
        const key = Object.keys(req.body);
        getPendingOrderRecords(req)
            .then((orderRecords) => {
                setExpiration(orderRecords.reverse()[key]);
                resolve(orderRecords.reverse()[key]);
            }).catch((err) => {
                console.error(err);
                reject(err);
            });
    })
}
module.exports = { getCompletedOrderRecords, completedOrder, getPendingOrderRecords };