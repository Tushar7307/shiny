const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3,
        max:50,
        trim:true
    },
    phone:{
        type:String,
        required:true,
        min:6,
        max:50,
        trim:true
    },
    isGold:{
        type:Boolean,
        default:false
    }
});

const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer){
    const schema = Joi.object({
        name:Joi.string().min(3).max(50).required(),
        phone:Joi.string().min(6).max(50).required()
    });
    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;