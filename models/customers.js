const mongoose = require('mongoose');
const Joi = require('joi')

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:4,
        maxlength:50
    },
    isGold:{
        type:Boolean,
        default:false,

    },
    phone:{
        type:String,
        required:true,
        minlength:4,
        maxlength:50,
    }
})

const Customer = mongoose.model('customer', customerSchema);



function validateCustomer(customer){
    const schema = Joi.object({
        name:Joi.string().min(4).max(50).required(),
        phone:Joi.string().min(4).max(50).required(),
        isGold:Joi.boolean().default(false)
    })

    return schema.validate(customer)
}

exports.Customer = Customer;
exports.validate = validateCustomer;