const { default: mongoose } = require('mongoose');
const accountModel = require('./dbModel/accountModel');
const orderRecordsModel = require('./dbModel/orderRecordsModel');
function getOrderRecords(req) {
    return new Promise((resolve, reject) => {
        accountModel.findById(req.session.sid)
            .then((foundAccount) => {
                if (foundAccount) {
                    const orderRecords = foundAccount.OrderRecords;
                    resolve(orderRecords);
                } else {
                    reject();
                    console.log('沒找到帳號');
                }
            })
            .catch((error) => {
                reject();
                console.error('查找帳戶出錯:', error);
            });
    });

}

function addOrderRecords(req) {
    return new Promise((resolve, reject) => {
        console.log(req.session.sid);
        accountModel.findById(req.session.sid)
            .then((foundAccount) => {
                if (foundAccount) {
                    const keys = Object.keys(req.session.cart);
                    const values = Object.values(req.session.cart);
                    let foodsArray = []; // 存放foods的JSON數組
                    let check = 0;
                    let totalQuantity = 0;
                    for (let i = 0; i < keys.length; i++) {
                        let foodItem = {
                            foodsName: keys[i],
                            quantity: values[i][0],
                            price: values[i][1] * values[i][0]
                        };
                        foodsArray.push(foodItem);
                        check += foodItem.price;
                        totalQuantity += foodItem.quantity;
                    }
                    let newOrder = {
                        id: new mongoose.Types.ObjectId(),
                        date: Date.now(),
                        totalQuantity,
                        amount: check,
                        foods: foodsArray,
                        expirationTime: new Date(Date.now() + 5 * 60 * 1000),
                        expiration: false

                    }
                    if (!req.session.orderRecords || !Array.isArray(req.session.orderRecords)) {
                        req.session.orderRecords = []; // 如果不是数组或者未定义，初始化为空数组
                    }
                    orderRecordsModel.create({ ...newOrder, accountId: req.session.sid })
                        .then((result) => {
                            console.log("訂單創建成功");
                            req.session.orderRecords.push(newOrder);
                            foundAccount.OrderRecords.push(newOrder);
                            return foundAccount.save(); // 保存用户账户信息
                        })
                        .then(() => {
                            console.log("用戶帳戶信息保存成功");
                            resolve(newOrder);
                        })
                        .catch((err) => {
                            console.error('操作出错:', err);
                            reject(err);
                        });
                } else {
                    console.log('未找到對應的帳戶');
                    reject();
                }
            })
            .catch((err) => {
                console.error('查詢帳戶時出錯:', err);
                reject(err);
            });
    });
}

module.exports = { addOrderRecords, getOrderRecords };