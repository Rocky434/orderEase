module.exports = function db() {
    const mongoose = require('mongoose');
    const { DBHOST, DBPOST, DBNAME } = require('../config/config');
    return new Promise((resolve, reject) => {
        mongoose.connect(`mongodb://${DBHOST}:${DBPOST}/${DBNAME}`);

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