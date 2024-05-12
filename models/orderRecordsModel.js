const mongoose = require('mongoose');

let orderRecordSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId
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
});
let orderRecordsModel = mongoose.model('PendingOrder', orderRecordSchema);

module.exports = orderRecordsModel;