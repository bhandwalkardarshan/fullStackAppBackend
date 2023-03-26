const express = require("express")
const mongoose = require("mongoose")
const {PostModel} = require("../models/post.model")
const postRoutes = express.Router()
// /posts ==> This will show the posts of logged in users.
// /posts/top ==> This will show the post details that has maximum number of comments for the user who has logged in.
// /posts/update ==> The logged in user can update his/her posts.
// /posts/delete ==> The logged in user can delete his/her posts.

postRoutes.get("/",async(req,res)=>{
    try{
        const {userId} = req.body
        const posts = await PostModel.find({userId})
        res.send(posts)
    }
    catch(err){
        res.send({"error":err.message})
    }
})

//add post
postRoutes.post("/",async(req,res)=>{
    try{
        const newpost = new PostModel(req.body)
        await newpost.save()
        res.send({"msg":"Post Created",post:newpost})
    }
    catch(err){
        res.send({"error":err.message})
    }
})

// post which have maximum number of comments
postRoutes.get("/top",async(req,res)=>{
    try{
        const post = await PostModel.find().sort({no_if_comments:-1}).limit(1)
        res.send({"msg":"Post having maximum number of comments",post:post})
    }
    catch(err){
        res.send({"error":err.message})
    }
})

// update posts
postRoutes.patch("/update/:id",async(req,res)=>{
    const id = req.params.id
    const payload = req.body
    try{
        let updated = await PostModel.findByIdAndUpdate({_id:id},payload)
        res.send({"msg":"Updated",post:updated})
    }
    catch(err){
        res.send({"error":err.message})
    }
})

// delete posts
postRoutes.delete("/delete/:_id",async(req,res)=>{
    try{
        let deleted = await PostModel.findByIdAndDelete(req.params)
        res.send({"msg":"Deleted",post:deleted})
    }
    catch(err){
        res.send({"error":err.message})
    }
})


module.exports={postRoutes}     