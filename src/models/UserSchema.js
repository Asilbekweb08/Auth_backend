const mongoose = require('mongoose')

const UserModel=new mongoose.Schema({
    name:{type:String, required:[true,"Ism familiyangizni kiriting"]},
    email:{type:String,required:[true,"emailingizni to'g'ri formatda kiriting"]},
    password:{type:String,required:[true,"Parol kiritishingiz shart!"]}
})


module.exports  =  mongoose.model("UserSchema",UserModel)