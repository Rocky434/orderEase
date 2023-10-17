
module.exports = function db() {
    return new Promise((resolve, reject) => {

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