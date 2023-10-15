
module.exports = function db() {
    //#region 簡化程式，錯誤處理寫在這裡
    return new Promise((resolve, reject) => {
        //#endregion

        const { default: mongoose } = require('mongoose');
        const { DBHOST, DBPOST, DBNAME } = require('../config/config');

        mongoose.connect(`mongodb://${DBHOST}:${DBPOST}/${DBNAME}`);

        mongoose.connection.once('open', () => {
            console.log('歡迎來到');
            resolve();

        });

        mongoose.connection.once('error', () => {
            console.log('你錯了');
            reject();
        });

        mongoose.connection.once('close', () => {
            console.log('結束');
        });
    });
}