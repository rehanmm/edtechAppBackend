
const Assignment=require('../models/assignmentModel');
const AWS = require('aws-sdk');
// AWS.config.update({accessKeyId: 'mykey', secretAccessKey: 'mysecret', region: 'myregion'});
const S3 = new AWS.S3();
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');
const {tsend,send} = require('../middleware/responseSender');
const {s3Uploadv2}=require('../utils/s3services')
// const Question = require('../models/questionModel');

const uploadAssignmet=catchAsyncError (async function (req, res) {

        const results = await s3Uploadv2(req.file);
        console.log(results);
        return res.json({ status: "success" });
});
const listOfAssignment=catchAsyncError (async function (req, res) {
    var params = {
        Bucket: process.env.AWS_BUCKET_NAME, /* required */
        Prefix: 'uploads/'  // Can be your folder name
      };
  
      S3.listObjects(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else    return tsend(data,'',res);           // successful response
      });
 
});

module.exports={uploadAssignmet,listOfAssignment}