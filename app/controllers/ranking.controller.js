const db = require('../models')
const Ranking = db.ranking;
const {ROLE} = require('../config/role.config');
const { create } = require('../models/post.model');

const addRanking=(req,res)=>{
    const ranking = new Ranking({
        teamName:req.body.name,
        description:req.body.description,
        ranking:Number.parseInt(req.body.ranking,10),
        format:req.body.format
    })
    ranking.save((err,ranking)=>{
        if(err){
            res.status(500).send({message:err})
        }
        res.status(200).send({message:`ranking added successfully!`,dbData:ranking})
     })
}

const getRanking=(req,res)=>{
    const format = req.params.format;
    Ranking.find({format:format}).sort({ranking:1}).lean().exec((err,dbData)=>{
        if(err){
            req.status(500).send({message:err})
        }
        res.status(200).send({dbData});
    })
}


const postCont = { 
    addRanking,
    getRanking
}
 module.exports = postCont;
