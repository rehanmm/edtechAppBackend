const Course=require('../models/courseModel');
const mongoose=require('mongoose')
const config=require('../config/config')
module.exports=async function(unit){
const course=await Course.findById(config.COURSE_ID);
console.log(course.units);
course.units.push(unit);
await course.save() 
} 