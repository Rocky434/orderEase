const { default: mongoose } = require('mongoose');
const accountModel = require('../models/accountModel');
const orderRecordsModel = require('../models/orderRecordsModel');
const errors = require('../config/errorMessage')



async function getOrderRecords(req) {
    const account = await findAccountById(req.session.sid);
    if (account) {
        const orderRecords = account.OrderRecords;
        return orderRecords;
    }
}
async function findOrderById(id) {
    const order = await orderRecordsModel.find({ id });
    if (!order) {
        throw errors.orderNotFound;
    }
    return order;
}

async function findAccountById(id) {
    const account = await accountModel.findById(id);
    if (!account) {
        throw errors.accountNotFound;
    }
    return account;
}

async function getOrder(req) {
    const food = req.session.food;
    // 過濾數量為0的餐點，訂製純餐點訂單。
    const foods = Object.entries(food).filter(([foodName, [foodQuantity, foodPrice]]) => foodQuantity !== 0)
        .map(([foodName, [foodQuantity, foodPrice]]) => ({
            name: foodName,
            quantity: foodQuantity,
            price: foodPrice
        }));

    const totalQuantity = foods.reduce((acc, food) => acc + food.quantity, 0);
    const amount = foods.reduce((acc, food) => acc + food.price * food.quantity, 0);

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
    return newOrder;
}

async function addOrderToDatabase(req, order) {
    const account = await findAccountById(req.session.sid);
    const createdOrder = await orderRecordsModel.create(order);
    account.OrderRecords.push(createdOrder);
    await account.save();
}


module.exports = {
    addOrderToDatabase,
    getOrderRecords,
    getOrder,
    findAccountById,
    findOrderById
};