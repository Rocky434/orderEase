
module.exports = function db(success, error) {
    //#region 簡化程式，錯誤處理寫在這裡
    if (typeof error !== 'function') {
        error = () => {
            console.log('連接失敗');
        }
    }
    //#endregion

    const { default: mongoose } = require('mongoose');
    const { DBHOST, DBPOST, DBNAME } = require('../config/config');

    mongoose.connect(`mongodb://${DBHOST}:${DBPOST}/${DBNAME}`);

    mongoose.connection.once('open', () => {
        console.log('歡迎來到');
        success();

    });

    mongoose.connection.once('error', () => {
        console.log('你錯了');
        error();
    });

    mongoose.connection.once('close', () => {
        console.log('結束');
    });
}