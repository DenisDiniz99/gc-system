const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.getAll = async() => {
    let data = await Product.find();
    return data;
}

exports.getById = async(id) => {
    let data = await Product.findById(id);
    return data;
}

exports.getBySlug = async(slug) => {
    let data = await Product.find({
        slug: slug
    });
    return data;
}

exports.create = async(data) => {
    let product = new Product(data);
    let result = product.save();
    return result;
}

exports.update = async(id, data) => {
    let result = await Product.findByIdAndUpdate(id, {
        $set:{
            title: data.title,
            description: data.description,
            slug: data.slug,
            price: data.price,
            active: data.active,
            tags: [data.tags]  
        }
    });
    return result;
}

exports.updateImage = async(image) => {
    let result = Product.findByIdAndUpdate({
        $set:{
            image: image
        }
    });
    return result;
}

exports.delete = async(id) => {
    let result = Product.findByIdAndRemove(id);
    return result;
}