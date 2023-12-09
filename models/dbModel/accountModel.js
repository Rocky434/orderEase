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
    OrderRecords: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true
        },
        date: {
            type: Date,
            default: Date.now()
        },
        amount: {
            type: Number,
            required: true
        },
        totalQuantity: {
            type: Number,
            required: true
        },
        foods: [{
            foodsName: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }],
        expirationTime: {
            type: Date,
            default: new Date(Date.now() + 5 * 60 * 1000)
        },
        expiration: {
            type: Boolean,
            default: false
        }

    }]

})

let accountModel = mongoose.model('accounts', accountSchema);

module.exports = accountModel;