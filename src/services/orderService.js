const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.getAll = async(customerId) => {
    let result = await Order.find({
        customer: customerId
    });
    return result;
}

exports.getById = async(id) => {
    let result = await Order.findById(id);
    return result;
}

exports.create = async(data) => {
    let order = new Order(data);
    let result = await order.save();
    return result;
}

exports.update = async(id, data) => {
    let result = await Order.findByIdAndUpdate(id, {
        $set: {
            customer: data.customer,
            status: data.status,
            itens: data.itens
        }
    });
    return result;
}

exports.delete = async(id) => {
    let result = await Order.findByIdAndRemove(id);
    return result;
}