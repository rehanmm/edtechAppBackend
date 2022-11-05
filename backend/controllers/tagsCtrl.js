const Tags = require("../models/tagsModel");
const express = require("express");
const mongoose = require("mongoose");
const catchAsyncError = require("../error/catchAsyncError");
const errorHandler = require("../utils/errorHandler");
const { send, tsend } = require("../middleware/responseSender");


const getAllTags=catchAsyncError(async (req,res,next)=>{

const tags= await Tags.findOne({}).select('tags');

tsend(tags,'',res);

})



const createTags=catchAsyncError(async (req,res,next)=>{
  const { tags, related } = req.body
  await Tags.findOneAndUpdate({}, {
    $push: {
      tags: { ...tags },
      related: { ...related }
    }
    
  })
    tsend({},'',res);
    
    })

    module.exports={ getAllTags,createTags}