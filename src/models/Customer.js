const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    corporateName:{
        type: String
    },
    document: {
        documentType:{
            type: String,
            required: true,
            enum: ['cpf', 'cnpj'],
            default: 'cpf'
        },
        documentNumber: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true,
        index: true
    },
    phone: {
        type: String,
    },
    birthDate:{
        type: Date
    },
    active:{
        type: Boolean,
        required: true,
        default: true
    },
    address:{
        street:{
            type: String,
            required: true
        },
        number:{
            type: String,
            required: true
        },
        neighborhood: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('Customer', customerSchema);