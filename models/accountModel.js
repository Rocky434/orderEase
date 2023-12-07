const mongoose = require('mongoose');

let accountSchema = mongoose.Schema({
    Account: {
        type: String,
        unique: true,
        require: true,
        minlength: 8
    },
    Password: {
        type: String,
        require: true,
        minlength: 8
    },
    OrderList: {
        type: String
    },
})

let accountModel = mongoose.model('accounts', accountSchema);

module.exports = accountModel;