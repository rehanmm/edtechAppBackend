const {Unit}=require('../models/unitModel');
const mongoose=require('mongoose')
module.exports=async function(lesson,unit_id){
const unit=await Unit.findById(unit_id);
lesson.index=unit.additionals.length
    unit.additionals.push(lesson);
await unit.save() 
} 