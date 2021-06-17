const mongoose = require('mongoose');

const Message = mongoose.model(
    "Message",
    new mongoose.Schema({
        user:String,
        content:String
    },
    {
        timestamps:true
    })
)

module.exports = Message