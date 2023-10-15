const mongoose = require('mongoose');

let accountsSchema = new mongoose.Schema({
    account: {
        type: String,
        unique: true,
        require: true,
        minlength: 8
    },
    password: {
        type: String,
        require: true,
        minlength: 8
    }
});

let accountModel = mongoose.model('accounts', accountsSchema);

module.exports = accountModel;