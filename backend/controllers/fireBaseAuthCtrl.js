const User=require('../models/userModel');
const Device=require('../models/deviceModel');
const express=require('express');
const mongoose =require('mongoose') ;
const catchAsyncError=require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');

//FIREBASE CONFIGURATION
const admin = require('firebase-admin');
let serviceAccount = require('../config/firbaseCredentials');
// const c = require('config');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://quaser-edtech.firebaseio.com'

});




const login=catchAsyncError( async function(req ,res){

const {user_id,phone_number,device_id}=req.body
const user=await admin.auth().getUser(user_id)
  let device;
 if(user.phoneNumber==phone_number){
   let device_id_matched = true;
   let msg = "Login Successful";
   let is_new = false;
  
    const myuser = await User.findOne({user_id})
  console.log(myuser)
    if(!myuser){
     
      const user1= new User({
        phone_number:phone_number,
        user_id: user_id,
        device_id: device_id,
        name: user.displayName,
       
      })
      is_new = true;
      await user1.save()
      msg = "New user created successfully";
    
   }
   


   if (is_new) { 
      device = new Device({
       user_id: user_id,
       old_device_id: device_id,
       status: "nothing",
       created_at: Date.now(),
      //  history: [{ 
      //    old_device_id: device_id,
      //    new_device_id: device_id,
      //    message: msg,
      //    status: "accepted",
      //    placeholder: "placeholder",
          
      //    created_at: Date.now()
      //  }]
        
       
     })
      await device.save()
     
   }


   if (!is_new) {
     
     if (myuser.device_id == device_id) {
       msg = "Login Successful";
      
     }

     else {
      device_id_matched = false;
       const device = await Device.findOne({user_id: user_id})
       console.log(device)
       device.status = "nothing";
       device.new_device_id = device_id;
      //  device.message = msg;
       device.created_at = Date.now();
       device.history.push({
         old_device_id: device.old_device_id,
         new_device_id: device.new_device_id
       })
       await device.save()
       msg = "your device is not registered with us, please contact admin";
     }
     
     
    }

   
     

   return res.status(200).json({
      success:true,
      message:msg,
     data: {
       is_new_user: is_new,
       user_id: user_id,
       user_name: user.name,
       device_id_matched

     }
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

   req.body.is_anonymous=true;

      // const a =Math.floor(Date.now()+ Math.random() * (20000-1) + 1);  
// req.body={user_id,
//           is_anonymous:true,
//           // email:`anonymous-${a}@user.com`
//       }

  
  let user = new User(req.body);
  
  
  await user.save()
  
 const {_id}=user


  res.status(200).json({
      success: true,
      message: 'Anonymous user created successfully',
     data:{userId:_id}

  })


})



module.exports={login,update,anonymous,admin}


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



