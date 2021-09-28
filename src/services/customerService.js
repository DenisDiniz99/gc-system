const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.getAll = async() => {
    let result = await Customer.find();
    return result;
}

exports.getByActiveStatus = async() => {
    let result = await Customer.find({
        active: true
    });
    return result;
}

exports.getById = async(id) => {
    let result = await Customer.findById(id);
    return result;
}

exports.create = async(data) => {
    var customer = new Customer(data);
    let result = await customer.save();
    return result;
}

exports.update = async(id, data) => {
    let result = await Customer.findByIdAndUpdate(id, {
        $set:{
            name: data.name,
            corporateName: data.corporateName,
            document: data.document,
            email: data.email,
            phone: data.phone,
            birthDate: data.birthDate,
            active: data.active,
            address: data.address
        }
    });
    return result;
}

exports.delete = async(id) => {
    let result = await Customer.findByIdAndRemove(id);
    return result;
}

