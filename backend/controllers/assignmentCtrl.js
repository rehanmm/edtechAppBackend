const Assignment = require("../models/assignmentModel");
const AWS = require("aws-sdk");
// AWS.config.update({accessKeyId: 'mykey', secretAccessKey: 'mysecret', region: 'myregion'});
const S3 = new AWS.S3();
const express = require("express");
const mongoose = require("mongoose");
const catchAsyncError = require("../error/catchAsyncError");
const errorHandler = require("../utils/errorHandler");
const { tsend, send } = require("../middleware/responseSender");
const { s3Uploadv2 } = require("../utils/s3services");
const Progress = require("../models/progressModel");
// const Question = require('../models/questionModel');

const uploadAssignmet = catchAsyncError(async function (req, res,next) {
  //TODO: update user progress for this assignment
  // await  Progress.findOneAndUpdate({user_id,unit_id},{$inc:{assignment_done:1}},{new:true})
  const results = await s3Uploadv2(req.file);
  req.assignment=results
  console.log(results);
  // TODO: here what is send is to be fixed
  return next()
});
const listOfAssignment = catchAsyncError(async function (req, res,next) {
  var params = {
    Bucket: process.env.AWS_BUCKET_NAME /* required */,
    Prefix: "assignments/", // Can be your folder name
  };
  

  S3.listObjects(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else return tsend(data, "", res); // successful response
  });
});

const submitAssignment = catchAsyncError(async function (req, res, next) {
  const { user_id, unit_id, lesson_id } = req.body;
  const { Location, Key,Bucket } = req.assignment;
  // const {assigned}=await Lesson.findOne({lesson_id,unit_id,type:'assignment'})
  const assignment = new Assignment({
    user_id,
    unit_id,
    lesson_id,
    status:'Submitted',
    submitted_on:Date.now(),
    assignment_url: Location,
    bucket_name:Bucket,
    file_path:Key,
  })

  await assignment.save();


  const obj = {};
  obj[lesson_id] = Date.now();
  await Progress.findOneAndUpdate(
    { user_id, unit_id },
    {
      $inc: { assignment_done: 1 },
      $addToSet: { completed_lessons: obj },
    },
    { new: true }
  );

  return tsend(assignment, "Assignment submitted successfully", res);
});



const listAssignment = catchAsyncError(async function (req, res,next) {
 const {user_id,unit_id,lesson_id,status}=req.body
  const assignment = await Assignment.find({user_id,unit_id,lesson_id,status})

});
const reviewAssignment = catchAsyncError(async function (req, res,next) {
 const {user_id}=req.body
 
const assignment = await Assignment.find({user_id})


});


module.exports = { uploadAssignmet, listOfAssignment ,submitAssignment,reviewAssignment};
