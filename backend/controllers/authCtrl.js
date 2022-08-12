const User=require('../models/userModel');
const express=require('express');
const mongoose =require('mongoose') ;
const jwt=require('jsonwebtoken');
const config=require('../config/config')


const catchAsyncError = require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');





const signin = catchAsyncError( async function(req,res){

        const user= await User.findOne({email:req.body.email})
        if(!user){
            return res.status(401).json({error:"User not found"})

        }
  if(!user.isValidPassword(req.body.password)){
    return res.status(401).json({error:"Email or Password does not match"})
  }
  const token=jwt.sign({_id:user._id},config.JWT_SECRET_KEY)
  res.cookie('t',token,{expire:new Date+10000});

  
return res.status(200).json({
   success:true,
   message:'login successfully',
    data:{
        token,
        _id:user._id,
        name:user.name,
        email:user.email
    }
})


})


const signout=catchAsyncError( function(req,res){

    res.clearCookie('t');
    return res.status(200).json({
        message:"signed out"
    })

})

const anonymous=catchAsyncError( async function(req,res){

   
    const {phone_number}=req.body
    
    if(phone_number===undefined){
        const a =Math.floor( Math.random() * (200000000000-1) + 1);
req.body={
            name:"Anonymous",
            is_anonymous:true,
            email:`anonymous${a}@user.com`
        }
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


const signup=catchAsyncError( async function(req,res){
   req.body.is_anonymous=false;
    let user = new User(req.body);
    
    
    await user.save()
    
   const {_id}=user
  

    res.status(200).json({
        success: true,
        message: 'user signed up successfully',
       data:{userId:_id}

    })


})


const requireSignin=function(req,res){

    const requireSignin = expressJwt({
        secret: config.jwtSecret,
        userProperty: 'auth'
       })
}


const hasAuthorisation=function(req,res){

    const hasAuthorization = (req, res, next) => {
        const authorized = req.profile && req.auth
        && req.profile._id == req.auth._id
        if (!(authorized)) {
        return res.status('403').json({
        error: "User is not authorized"
        })
        }

        next()
       }

}






function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET , (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}


module.exports={anonymous,signin,signup,signout,requireSignin,hasAuthorisation}