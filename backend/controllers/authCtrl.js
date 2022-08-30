// const User=require('../models/userModel');
const Admin=require('../models/adminModel');
const express=require('express');
const mongoose =require('mongoose') ;
const jwt=require('jsonwebtoken');
const config=require('../config/config')
const {send,tsend}=require('../middleware/responseSender')
const catchAsyncError = require('../error/catchAsyncError');
const errorHandler = require('../utils/errorHandler');



const signin = catchAsyncError( async function(req,res,next){
const {email,password}=req.body
        const admin= await Admin.findOne({email})
        if(!admin){
            return next(new errorHandler('User not found',401));

        }
  if(!admin.isValidPassword(password)){
    
    return next(new errorHandler('Email or Password does not match',401));
  }
  const token=jwt.sign({admin_id:admin._id},config.JWT_SECRET_KEY,{expiresIn:'172800s'})
  res.cookie('jwt',token,{expire:'172800s'});


  
return res.status(200).json({
   success:true,
   message:'login successfully',
    data:{
        admin_id:admin._id,
        token,
        email:admin.email
    }
})



})


const signout=catchAsyncError( function(req,res){

    res.clearCookie('jwt');
    return res.status(200).json({
        success:true,
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


const createNewAdmin=catchAsyncError( async function(req,res){
    let admin = new Admin(req.body);
    console.log(req.body)
    await admin.savePassword();
    await admin.save()

   const {_id}=admin
    res.status(200).json({
        success: true,
        message: 'admin created successfully',
       data:{admin_id:_id}

    })
})


const removeAdmin=catchAsyncError(async function(req,res){
    const {sec_admin_id,admin_id}=req.body

    if(sec_admin_id===admin_id){
        return next(new errorHandler('you are not allowed to perform this operation',401));
    }


   const admin =await Admin.findByIdAndDelete(sec_admin_id)
    if(!admin){
       return next(new errorHandler('Admin not found',401));
        }
        res.status(200).json({
            success:true,
            message:'Admin deleted successfully'
        })
    })
const listAdmins=catchAsyncError(async function(req,res){

    const admins= await Admin.find({}).select('-password -__v -salt')
    if(!admins){
        return next(new errorHandler('Admins not found',401));
    }
    res.status(200).json({
        success:true,
        message:'Admins listed successfully',
        data:admins
    })
}
)
const readAdmin=catchAsyncError(async function(req,res){
    const {sec_admin_id}=req.body
    const admin= await Admin.findById(admin_id)
    if(!admin){
        return next(new errorHandler('Admin not found',401));
    }
    res.status(200).json({
        success:true,
        message:'Admin fetched successfully',
        data:admin
    })

})




module.exports={anonymous,signin,createNewAdmin,readAdmin,listAdmins,removeAdmin,signout}