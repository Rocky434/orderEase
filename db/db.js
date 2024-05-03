module.exports = function db() {
    const mongoose = require('mongoose');
    const { URI } = process.env;

    return new Promise((resolve, reject) => {
        mongoose.connect(URI);

        mongoose.connection.once('open', () => {
            console.log('成功連接數據庫');
            resolve();
        })
        mongoose.connection.once('error', () => {
            console.log('連接數據庫出錯');
            reject();
        })
        mongoose.connection.once('close', () => {
            console.log('數據庫結束連接');
        })

    })
}