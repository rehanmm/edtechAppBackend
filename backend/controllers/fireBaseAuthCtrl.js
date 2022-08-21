const User=require('../models/userModel');
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');

//FIREBASE CONFIGURATION
const admin = require('firebase-admin');
let serviceAccount = require('../config/quaser-edtech-firebase-adminsdk-7yvco-33641cf2b5.json');
// const c = require('config');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



const login=catchAsyncError( async function(req ,res){

  // console.log(req.body)
const {user_id,phone_number}=req.body

 const user=await admin.auth().getUser(user_id)
  // console.log(user)
 if(user.phoneNumber==phone_number){
   
   let msg = "Login Successful";
   let is_new = false;
    // console.log(req.body.user_id)
    const user = await User.findOne({user_id})
    console.log(user)
    if(!user){
      const a =Math.floor( Math.random() * (200000000000-1) + 1);
      const user1= await new User({
        phone_number:phone_number,
        user_id:user_id,
        email:`dummy-user${a}@email.com`
      })
      await user1.save()
      msg = "New user created successfully";
      is_new = true;
    }

   return res.status(200).json({
      success:true,
      message:msg,
      data:{is_new_user:is_new,user_id:user_id}
    })


  }

  return res.status(200).json({
    success:true,
    message:'invalid user',
    data:{is_new_user:false,user_id:null}
  })



})


const update=catchAsyncError( async function(req ,res){

  const {user_id,phone_number,name}=req.body

//  const user=await admin.auth().getUser(user_id)

const user=await User.exists({user_id})

if(!user){
  return res.status(200).json({
    success:true,
    message:'invalid user',
    data:{}
  })
}

const user1= await User.findOneAndUpdate({user_id},{phone_number,name})

return res.status(200).json({
  success:true, 
  message:'updated successfully',
  data:user1
})
})
const anonymous=catchAsyncError( async function(req,res){

   
  const {user_id}=req.body
  
      const a =Math.floor( Math.random() * (20000000000000-1) + 1);
req.body={user_id,
          is_anonymous:true,
          email:`anonymous-${a}@user.com`
      }



  
  let user = new User(req.body);
  
  
  await user.save()
  
 const {_id}=user


  res.status(200).json({
      success: true,
      message: 'Anonymous user created successfully',
     data:{userId:_id}

  })


})



module.exports={login,update,anonymous}


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



