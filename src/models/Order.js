const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    createDate: {
        type: Date,
        require: true,
        default: Date.now
    },
    status: {
        type: String,
        require: true,
        enum: ['created', 'canceled', 'done'],
        default: 'created'
    },
    itens:[{
        quantity:{
            type: Number,
            require: true,
            default: 1
        },
        price: {
            type: Number,
            require: true
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }]
});

module.exports = mongoose.model('Order', orderSchema);