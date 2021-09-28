const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        require: true
    },
    active: {
        type: Boolean,
        require: true,
        default: true
    },
    tags: [{
        type: String,
        require: true
    }],
    image: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('Product', productSchema);