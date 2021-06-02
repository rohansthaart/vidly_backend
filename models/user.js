const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:50,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:5,
        maxlength:255
    },
    password:{
        type:String,
        required:true,
        maxlength:1024,
        minlength:5
    },
    isAdmin:Boolean

})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id,isAdmin:this.isAdmin}, process.env.secret);
    return token;
}

const User = mongoose.model('User' , userSchema)


function userValidate(register){
    const schema= Joi.object({
        name:Joi.string().required().max(50).min(3),
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    })
    return schema.validate(register)
}


exports.User = User;
exports.validate = userValidate