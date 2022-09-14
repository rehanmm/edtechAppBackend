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
 const rows= await leaderboard.list('all',{limit,page})
console.log(rows)
    res.status(200).json({
        success:true,
        ...rows
    })

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


module.exports = {rankList,rankSurronding,rankPostion,create}


   