
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test');

mongoose.connection.on('open', () => {
    console.log('歡迎來到');

});
mongoose.connection.on('error', () => {
    console.log('你錯了');
});
mongoose.connection.on('close', () => {
    console.log('結束');
});

setTimeout(() => {
    mongoose.disconnect();
}, 2000);