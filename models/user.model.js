const {model, Schema}= require('mongoose');

const UserSchema=new Schema({
    email:String,
    password:String,
    name:String
})

const UserModel = model ('user',UserSchema);
module.exports=UserModel;