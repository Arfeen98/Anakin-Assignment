const express = require ("express");
let jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const {lookup} = require('geoip-lite');

const UserModel = require("../models/user.model");
const userController = express.Router();

userController.post("/signup",(req,res)=>{
    const {email,password,name}=req.body;
    let ip=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if(ip.substr(0,7)==="::ffff:"){
        ip=ip.substr(7);
    }
    const details = lookup(ip);
    bcrypt.genSalt(8, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            // Store hash in your password DB.
            if(err){
                res.send("Try again");
            }
            const user = new UserModel({
                email,
                password:hash,
                name,
                ip,
                details
            })
            await user.save();
            res.send("Sign up is Successfull");
        });
    });
})

userController.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    const user = await UserModel.findOne({email});
    if(! user){
        return res.send("Invalid Credentials");
    }
    const hash= user.password;
    const userId=user._id;
    bcrypt.compare(password, hash, function(err, result) {
        // res === true
        if(result){
            let token = jwt.sign({email,userId}, process.env.SECRET);
            return res.send({"message":"Login Succesfull", "token":token})
        }
        else{
            return res.send("Invalid credentials");
        }
    });
})

module.exports = userController;
