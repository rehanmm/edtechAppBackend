const User = require('../models/userModel');
const Course = require('../models/courseModel')
const express = require('express');
const mongoose = require('mongoose');
const catchAsyncError = require('../error/catchAsyncError')
const { homeData } = require('../utils/objectConstructor');
const errorHandler = require('../utils/errorHandler');
const prereqFunction = require('../helpers/prerequisiteConditions');
const {completdunitPusher}=require('../helpers/userProgressUpdate');
const {send,tsend}=require('../middleware/responseSender');
const config=require('../config/config')




const list = catchAsyncError(async function (req, res, next) {
const {user_id}=req.body
    // console.log(req.body.user_id)
    const user = await User.findOne({user_id})
    // console.log(user)
    if (!user) {
        return next(new errorHandler('list not found', 200))
    }
    const course = await Course.findById(config.COURSE_ID).select('-_id');

    currentTime = Date.now();
    let diffTime = 1;
    if(course.expiry)
    {
        diffTime = course.expiry - currentTime;
     }
     
    diffTime = course.expiry - currentTime;
    if (diffTime <= 0) {
       
        for (let i = 0; i < course.units.length; i++) {
            course.units[i].unit_id=undefined;
        }   
    }
  
   

        await user.save();
        //    console.log(course.units[0].is_locked)
        for( let i=0;i<course.units.length;i++){
            course.units[i].is_locked=prereqFunction(user,course.units[i].prerequisite)
        }
        //    
        const home = new homeData(user, course);
      home.units.sort((a, b) => a.index-b.index);
// send(home,'',res);
 tsend(home,'',res);

       
    })
    
    module.exports = { list };
    
