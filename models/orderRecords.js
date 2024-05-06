const { default: mongoose } = require('mongoose');
const accountModel = require('./dbModel/accountModel');
const orderRecordsModel = require('./dbModel/orderRecordsModel');
const errors = require('../config/errorMessage')



async function getOrderRecords(req) {
    const account = await findAccountBySessionId(req);
    if (account) {
        const orderRecords = account.OrderRecords;
        return orderRecords;
    }
}

async function findAccountBySessionId(req) {
    const account = await accountModel.findById(req.session.sid);
    if (!account) {
        throw errors.accountNotFound;
    }
    return account;
}


async function addOrderRecords(req) {
    const account = await findAccountBySessionId(req);

    const food = req.session.food;
    // 過濾數量為0的餐點，訂製純餐點訂單。
    const foods = Object.entries(food).filter(([foodName, [foodQuantity, foodPrice]]) => foodQuantity !== 0)
        .map(([foodName, [foodQuantity, foodPrice]]) => ({
            foodsName: foodName,
            quantity: foodQuantity,
            price: foodPrice * foodQuantity
        }));

    const totalQuantity = foods.reduce((acc, food) => acc + food.quantity, 0);
    const amount = foods.reduce((acc, food) => acc + food.price, 0);


    let newOrder = {
        id: new mongoose.Types.ObjectId(),
        accountId: req.session.sid,
        date: Date.now(),
        totalQuantity,
        amount,
        foods,
        expirationTime: new Date(Date.now() + 5 * 60 * 1000),
        expiration: false
    };

    const createdOrder = await orderRecordsModel.create(newOrder);
    account.OrderRecords.push(createdOrder);
    await account.save();

    return createdOrder;
}


module.exports = { addOrderRecords, getOrderRecords };