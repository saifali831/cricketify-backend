const mongoose = require('mongoose');

const Comment = mongoose.model(
    "Comment",
    new mongoose.Schema({
        text:String,
        addedBy:String
    })
)

module.exports = Comment