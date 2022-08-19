const User=require('../models/userModel');
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');

//FIREBASE CONFIGURATION
const admin = require('firebase-admin');
let serviceAccount = require('../config/quaser-edtech-firebase-adminsdk-7yvco-33641cf2b5.json');
const c = require('config');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



const login=catchAsyncError( async function(req ,res){

  // console.log(req.body)
const {user_id,phone_number}=req.body

 const user=await admin.auth().getUser(user_id)
//  console.log(user)
 if(user.phoneNumber==phone_number){
  if(!user.displayName){
const user1= await new User({
  phone_number:phone_number,
  user_id:user_id,
})
await user1.save()

 res.status(200).json({
  success:true,
  message:'no userName found',
  data:user1
})

  }

   res.status(200).json({
    success:true,
    message:'login successfully',
    data:{
      user_id,phone_number,user
    }
  }
    )
  }     


res.status(200).json({
  success:false,
  message:'login failed',
  data:{}
})


})


const update=catchAsyncError( async function(req ,res){

})


module.exports={login}


// admin.auth().createUser({
//     email: "aditya@gmail.com",
//     emailVerified: false,
//     phoneNumber: "+917243543534",   
//     password: "mkdfkord",
//     displayName: "Aditya Doe",
//     photoURL: "http://www.example.com/12345678/photo.png",
//     disabled: false
//   })
//     .then(function(userRecord) {
//         console.log(userRecord);
//       // See the UserRecord reference doc for the contents of userRecord.
//       console.log("Successfully created new user:", userRecord.uid);
//     })
//     .catch(function(error) {
//       console.log("Error creating new user:", error);
//     });

// // const uid='Dp95jB5jdGWseG2w4kqt28SKNkW2'
// // const func=async ()=>{
// // var user =await admin.auth().getUser(uid)
// // console.log(user)
// // const currentUser = admin.auth().currentUser;
// // console.log(currentUser)
// // }

// // func()

// admin.auth().listUsers(4).then((user)=>console.log(user)).catch((error)=>console.log(error))



