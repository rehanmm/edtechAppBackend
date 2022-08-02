const User=require('../models/userModel');
const express=require('express');
const mongoose =require('mongoose') ;
const jwt=require('jsonwebtoken');
const config=require('../config/config')




const signin= async function(req,res){
    
    try{
     
        
        const user= await User.findOne({email:req.body.email})
        if(!user){
            return res.status(401).json({error:"User not found"})

        }
  if(!user.isValidPassword(req.body.password)){
    return res.status(401).json({error:"Email or Password does not match"})
  }
  const token=jwt.sign({_id:user._id},config.JWT_SECRET_KEY)
  res.cookie('t',token,{expire:new Date+10000});
  console.log('test')
  
return res.status(200).json({
    token,
    user:{
        _id:user._id,
        name:user.name,
        email:user.email
    }
})
    }catch(error){
        return res.status(401).json({
           message:error.message,
        })
    }

}


const signout=function(req,res){

    res.clearCookie('t');
    return res.status(200).json({
        message:"signed out"
    })

}


const requireSignin=function(req,res){

    
}


const hasAuthorisation=function(req,res){



}


module.exports={signin,signout,requireSignin,hasAuthorisation}