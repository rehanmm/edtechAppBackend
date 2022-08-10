const mongoose=require('mongoose');

 const completdunitPusher=function(key,value,user){
userCompletedLessonArray=user.units_completed;

let obj={};
obj[key]=value;
userCompletedLessonArray.push(obj) 
// user.save();
// console.log(userCompletedLessonArray);

}

module.exports={ completdunitPusher}