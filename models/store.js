const { default: mongoose } = require('mongoose');
const orderRecordsModel = require('./dbModel/orderRecordsModel');
const accountModel = require('./dbModel/accountModel');
function getPendingOrderRecords(req) {
    return new Promise((resolve, reject) => {
        orderRecordsModel.find({ expiration: false })
            .then((orderRecords) => {
                // orderRecords 包含了所有账户的 OrderRecords 数据
                // orderRecords.map((record) => console.log(record.OrderRecords.foods))
                // orderRecords.forEach(record => {
                //     console.log(record.OrderRecords.foods);
                //     record.OrderRecords.foods.forEach(food => {
                //         console.log(food);
                //     });
                //     console.log(record.OrderRecords.amount);
                // });
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
                // orderRecords 包含了所有账户的 OrderRecords 数据
                // orderRecords.map((record) => console.log(record.OrderRecords.foods))
                // orderRecords.forEach(record => {
                //     console.log(record.OrderRecords.foods);
                //     record.OrderRecords.foods.forEach(food => {
                //         console.log(food);
                //     });
                //     console.log(record.OrderRecords.amount);
                // });
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
    console.log(orderRecord.id);
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
            console.log("成功更改客戶端expiration");
        })
        .catch((err) => {
            console.error(err);
        });
}
function completedOrder(req) {
    return new Promise((resolve, reject) => {
        const key = Object.keys(req.body);
        console.log(key);
        getPendingOrderRecords(req)
            .then((orderRecords) => {
                setExpiration(orderRecords.reverse()[key]);
                resolve(orderRecords);
            }).catch((err) => {
                console.error(err);
                reject(err);
            });
    })
}
module.exports = { getCompletedOrderRecords, completedOrder, getPendingOrderRecords };