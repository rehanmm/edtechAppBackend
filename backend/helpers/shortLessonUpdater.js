const {Unit}=require('../models/unitModel');
const mongoose=require('mongoose')
module.exports=async function(lesson,unit_id){
    // console.log(lesson)
    // console.log(unit_id)
const unit=await Unit.findById(unit_id);
console.log(unit.lessons);
unit.lessons.push(lesson);
await unit.save() 
} 