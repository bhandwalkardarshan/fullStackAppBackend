const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userRoutes = express.Router()
const{UserModel} = require("../models/user.model") 

// registering user
userRoutes.post("/reg",async(req,res)=>{
    // console.log(req.body)
    try{
        const {name, email, gender, password, age, city} = req.body
        const user = await UserModel.find({email})
        if(user.length>0){
            res.send({"msg":"User is already exists. Please login"})
        }
        else {
            bcrypt.hash(password, 5, async(err, hash)=> {
                if(err){
                    res.send({"error":err.message})
                }
                else {
                    const newuser = new UserModel({name, email, gender, password:hash, age, city})
                    await newuser.save()
                    res.send({"msg":"New user has been registered successfully"})
                }
            })
        }
    }
    catch(err){
        res.status(400).send({"msg":err.message})
    }
})

userRoutes.post("/login",async(req, res)=>{
    try{
        const {email,password} = req.body
        const user = await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result) => {
                if(result){
                    const token = jwt.sign({userId: user[0]._id},'masai', { expiresIn: 60 * 60 })
                    res.send({"msg":"Login Successful","token":token})
                }
                else {
                    res.send({"msg":"Wrong Credentials"})
                }
            })
        }
    }
    catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports={userRoutes}