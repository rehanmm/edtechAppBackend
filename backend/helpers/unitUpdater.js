const Course=require('../models/courseModel');
const mongoose=require('mongoose')
module.exports=async function(unit){
const course=await Course.findById('62eb70e4bcc3b3486d2af137');
console.log(course.units);
course.units.push(unit);
await course.save() 
} 