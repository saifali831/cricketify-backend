const db = require('../models')
const User = db.user;
checkDuplicateEmail=(req,res,next)=>{
        User.findOne({email:req.body.email})
        .exec((err,user)=>{
            if(err){
                res.status(500).send({message:err});
                return;
            }
            if(user){ 
                res.status(400).send({message:'Email already is in use'});
                return;
            }
            next()
        })
    
}

checkLogin=(req,res,next)=>{
    if(!req.body.isLoggedIn){
        res.status(403).send({message:"Please login to proceed"})
    }
    else{
        next();
    }
    
}
const signupHelpers = {
    checkDuplicateEmail,
    checkLogin   
}
module.exports= signupHelpers;
