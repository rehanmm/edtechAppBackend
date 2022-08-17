const {Unit}=require('../models/unitModel');
const mongoose=require('mongoose')
module.exports=async function(lesson,unit_id){
const unit=await Unit.findById(unit_id);
lesson.index=unit.lessons.length+1
unit.lessons.push(lesson);
await unit.save() 
} 