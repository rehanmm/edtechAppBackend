const { times } = require('lodash');
const { Timestamp } = require('mongodb');
const mongoose=require('mongoose')

const leaderboardSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    user_name:{
        type:String,
    },
    total_score:{
type:Number
    }

},timestamps:{createdAt:'created_at',updatedAt:'updated_at'});

module.exports=mongoose.model('Leaderboard',leaderboardSchema)
