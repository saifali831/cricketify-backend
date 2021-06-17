const mongoose = require('mongoose');

const Ranking = mongoose.model(
    "Ranking",
    new mongoose.Schema({
        teamName:String,
        description:String,
        ranking:Number,
        format:String
    })
)

module.exports = Ranking