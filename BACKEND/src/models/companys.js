const mongoose = require('mongoose');
const validator = require('validator');

const companyScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, 'Company Name is already used'],
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email id already used'],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email Id');
            }
        },
    },
    description: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        min: 10,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
});

module.exports = new mongoose.model('Company', companyScheme);
