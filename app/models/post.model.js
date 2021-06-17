const mongoose = require('mongoose');

const Post = mongoose.model(
    "Post",
    new mongoose.Schema({
        title:String,
        text:String,
        addedBy:{type:mongoose.Schema.Types.ObjectId,ref: 'User'},
        comments:[{text:String,userName:String}]
    })
)

module.exports = Post