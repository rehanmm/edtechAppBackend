const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');
const {tsend,send} = require('../middleware/responseSender');
const {MongoClient}=require("mongodb");
const {Leaderboard}= require("@gamestdio/leaderboard");
const {MONGODB_URI}=require("../config/config");

const client = new MongoClient(MONGODB_URI);
   let db = client.db("leaderboard");
// Initialize the leaderboard.
const leaderboard = new Leaderboard(db);




leaderboard.create("all", { ttl: 1 * 60 * 60 * 24*4*365 });

// const leaderBoard=require('../models/');
const create=catchAsyncError(  async function(req ,res,){
  
const {user_id,user_name,score}=req.body
    leaderboard.record("all", { user_id,user_name, score });

    res.status(200).json({
        success:true
    })

})

const rankList=catchAsyncError(  async function(req ,res,next){
const page = parseInt(req.body.page) || 1;
const limit = parseInt(req.body.limit) || 15;
pageSize = parseInt(limit) || 10;
const leaderboardId='all'
const total =await db.collection(`lb_${leaderboardId}`).estimatedDocumentCount();
const pages = Math.ceil(total / pageSize);
db.collection(`lb_${leaderboardId}`).find({}).sort({score:-1}).skip((page-1)*limit).limit(limit).toArray(function(err, result) {
  
    res.status(200).json({
        success:true,
        page,
        pages,
        total,
       data: result
    })



})
//  const rows= await leaderboard.list('all',{limit,page})




})


const rankPostion=catchAsyncError(async function(req ,res,next){
    const {user_id}=req.body
    leaderboard.position('all',user_id).then((position) => {
       

        res.status(200).json({
            success:true,
            position
        })
    });
    
})



const rankSurronding = catchAsyncError( async function(req ,res,next){
const {user_id}=req.body
    leaderboard.surrounding("all",user_id, { limit: 3 }).then((scores) => {
        res.status(200).json({
            success:true,
            scores
        }) 
    })
    
})



const apprankList=catchAsyncError(  async function(req ,res,next){
    const {user_id}=req.body
const page = parseInt(req.body.page) || 1;
const limit = parseInt(req.body.limit) || 20;
pageSize = parseInt(limit) || 10;
const leaderboardId='all'
const total =await db.collection(`lb_${leaderboardId}`).estimatedDocumentCount();
    const pages = Math.ceil(total / pageSize);
    const user = await db.collection(`lb_${leaderboardId}`).findOne({ id: user_id });
    let position = -1;
  
    if (user) {
        
        position = await  db.collection(`lb_${leaderboardId}`).countDocuments({
            score: {
                $gt: user.score
            }
        })
        position++;
    
     
        user.rank=position
    }
    
   
    
    db.collection(`lb_${leaderboardId}`).find({}).sort({score:-1}).collation({locale: "en_US", numericOrdering: true}).skip((page-1)*limit).limit(limit).toArray(function(err, result) {
  let rank=(page-1)*limit+1
        for (let i = 0; i < result.length; i++)
{
    result[i].rank = rank;

    rank++

        }
        
        if (page > pages) {
            return res.json({
                success: false,
                message:"No pages found"
            })
        }


        res.status(200).json({
            success:true,
           data:{
            position,
            page,
            pages,
            user,
            total,
             result
            }
        })
    
    
    
    })
  

 


 
})
const testWise=catchAsyncError(  async function(req ,res,next){
    const {user_id,lesson_id}=req.body
const page = parseInt(req.body.page) || 1;
const limit = parseInt(req.body.limit) || 20;
pageSize = parseInt(limit) || 10;
const leaderboardId='testWise'
    const total = await db.collection(`lb_${leaderboardId}`).countDocuments({
        lesson_id
    });
    
    const pages = Math.ceil(total / pageSize);
    const user = await db.collection(`lb_${leaderboardId}`).findOne({ id: user_id });
    console.log(user)
    if (!user) {
        return res.status(200).json({
            success: true,
            page,
            pages,
            total,
            data: []
        })
    }

    let position = -1;
    if (user) {
        
        position = await  db.collection(`lb_${leaderboardId}`).countDocuments({
            score: {
                $gt: user.score
        
            },
            lesson_id,
        })
        position++;
    
     
    }
    user.rank=position
    
   
    
    db.collection(`lb_${leaderboardId}`).find({}).sort({score:-1}).collation({locale: "en_US", numericOrdering: true}).skip((page-1)*limit).limit(limit).toArray(function(err, result) {
        let rank = (page - 1) * limit + 1
        // console.log(result)
        for (let i = 0; i < result.length; i++)
{
    result[i].rank = rank;

    rank++

        }
       
        if (page > pages) {
            return res.json({
                success: false,
                message:"No pages found"
            })
        }


        res.status(200).json({
            success:true,
           data:{
            position,
            page,
            pages,
            user,
            total,
             result
            }
        })
    
    
    
    })
  

 


 
})


module.exports = {testWise,rankList,rankSurronding,rankPostion,apprankList,create,leaderboard,db}


