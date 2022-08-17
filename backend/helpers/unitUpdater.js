const Course=require('../models/courseModel');
const mongoose=require('mongoose')
const config=require('../config/config')
module.exports=async function(unit){
const course=await Course.findById(config.COURSE_ID);
unit.index=course.units.length+1
// console.log(unit.index);
course.units.push(unit);
await course.save() 
} 