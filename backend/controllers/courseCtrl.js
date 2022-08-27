const Course = require('../models/courseModel');
const express = require('express');
const config=require('../config/config')
const mongoose = require('mongoose');
const catchAsyncError = require('../error/catchAsyncError')
const errorHandler = require('../utils/errorHandler');
const { send, tsend } = require('../middleware/responseSender');
// const { findById } = require('../models/userModel');

const list = catchAsyncError(async function (req, res,) {
    const course = await Course.find({});
    res.status(200).json(course)
})

const create = catchAsyncError(async function (req, res) {


    const course = new Course(req.body);

    await course.save()
    tsend(course,'course created successfully',res)
    // res.status(200).json(course)
    
    
    
})
const read = catchAsyncError(async function (req, res) {
    const course= await Course.findById(config.COURSE_ID)
    // res.status(200).json(course)
    tsend(course,'',res)

})
const remove = catchAsyncError(async function (req, res) {
    const course = await Course.findById(config.COURSE_ID)
    await course.remove();
    // await Unit.deleteMany({course_id});

    res.status(200).json({
        success: true,
        message: 'deleted successfully'
    })

})


const update = catchAsyncError(async function (req, res) {

    await Course.findByIdAndUpdate(config.COURSE_ID, req.body)
    const course =await Course.findById(config.COURSE_ID);
    res.status(200).json(
        {
            success: true,
            message: 'updated successfully',
            data:course

        }
    )

})

// const courseById = catchAsyncError(async function (req, res, next) {
//     const course = await Course.findById(req.params.courseId);
//     let unit = await Course.findById(req.params.courseId).select('units -_id');
//     // console.log(course.units)
//     // console.log(unit.units)
//     unit = unit.units
//     course.units.push(
//         {

//             unit_title: "Physics",
//             tags: ["thermodynamics", "Mechanics", "Electrodynamics", "Waves"],
//             total_lessons: "10",
//             completed_lessons: "3",
//             prerequisite: {
//                 has_prerequisite: false,
//                 type: 'auto'
//                 ,//manual or auto
//                 time: 0,
//                 message: "please complete required unit first"

//             },

//             is_locked: false,
//             is_paid: false
//         }

//     );
//     course.units.push(
//         {

//             unit_title: "Physical chemistry",
//             tags: ["Mole concept", "Ionic Equilibirium", "Chemical Equilibrium"],
//             total_lessons: "6",
//             completed_lessons: "7",
//             prerequisite: {
//                 has_prerequisite: false,
//                 type: 'auto'
//                 ,//manual or auto
//                 time: 0,
//                 message: "please complete required unit first"

//             },

//             is_locked: true,
//             is_paid: false
//         }

//     );

//     await course.save()
//     req.course = unit

//     next()
// })

module.exports = {
    list, read, update,create, remove
}