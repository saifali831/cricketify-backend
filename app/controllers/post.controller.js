const db = require('../models')
const Post = db.post;
const {ROLE} = require('../config/role.config');
//const parser = require('../config/cloudinary.config');
const { create } = require('../models/post.model');

const createPost=(req,res)=>{
    //console.log(req.file);
    const post = new Post({
        title:req.body.postTitle,
        text:req.body.postText,
        addedBy:req.body.userId,
    })
    post.save((err,user)=>{
        if(err){
            res.status(500).send({message:err})
        }
         res.status(200).send({message:`post added successfully!`})
     })
}
const getAllPosts=(req,res)=>{
    Post.find({})
    .populate('addedBy')
    .select('title text comments addedBy')
    .lean()
    .exec((err,result)=>{
        if(err){
            res.status(500).send({message:err})
        }
        console.log(result);
        res.status(200).send(result)
    })
}
const getSearchedPosts=(req,res)=>{
    console.log(req.query.filter);
    const query = req.query.query;
    const regex = new RegExp(query,'i');
   
    const filter = req.query.filter;
    let searchOption;
    if(filter==="keyword"){
        searchOption={
            "text":{$regex:regex}
        }
    }
    if(filter==="username" || filter==="all"){
        searchOption={}
    }
    Post.find(searchOption)
    .populate('addedBy')
    .select('title text comments addedBy')
    .lean()
    .exec((err,result)=>{
        if(err){
            res.status(500).send({message:err})
        }
        if(filter==="username"){
            const postsByUser = result.filter((e)=>{
                return e.addedBy.firstName == query;
            })   

            result=postsByUser.slice(0);
        }
        res.status(200).send(result)
    })
}
const getPostsByUser=(req,res)=>{
    Post.find({addedBy:req.params.id})
    .populate('addedBy')
    .select('title text comments addedBy')
    .lean()
    .exec((err,result)=>{
        if(err){
            res.status(500).send({message:err})
        }
        res.status(200).send(result)
    })
}
const createComment=(req,res)=>{
    Post.updateMany({_id:req.body.postId},
        {$push:{comments:{text:req.body.text,userName:req.body.userName}}},(err,result)=>{
            if(err){
                res.status(500).send({message:err})
            }
            else{
                res.status(200).send({message:"comment added succefully!"})
            }
        })
}
const postCont = { 
   createPost,
   getAllPosts,
   createComment,
   getPostsByUser,
   getSearchedPosts
}
module.exports = postCont;