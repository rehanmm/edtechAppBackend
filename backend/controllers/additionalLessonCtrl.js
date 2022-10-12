const AdditionalLesson = require("../models/additonalLessonModel");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const { Unit } = require("../models/unitModel");
const express = require("express");
const mongoose = require("mongoose");
const catchAsyncError = require("../error/catchAsyncError");
const errorHandler = require("../utils/errorHandler");
const { send, tsend } = require("../middleware/responseSender");
const Progress = require("../models/progressModel");
const Assignment = require("../models/assignmentModel");
const prereqFunction = require("../helpers/unitHelper/condition");
const { longLessonToShort } = require("../utils/objectConstructor");
const shortLessonupdater = require("../helpers/additionalLessonUpdater");
const video = require("../helpers/lessonHelpers.js/videoUrlProcessing");
const config = require("../config/config");
const countAdditionalLesson=require('../helpers/unitHelper/mongoQueries');
const {checker:checkIfUnitCompleted}=require('../helpers/lessonHelpers.js/unitsCompletionHelper');

const list = catchAsyncError(async function (req, res,next) {
  const additionalLesson = await AdditionalLesson.find({ unit_id: req.body.unit_id });
  if (!additionalLesson) {
    return next(new errorHandler("No AdditionalLesson found", 404));
  }
  tsend(additionalLesson, "", res);
});

const create = catchAsyncError(async function (req, res, next) {
  // console.log(req.body);
  //TODO: add unit name to AdditionalLesson
  const { unit_id, type } = req.body;
  if (type == "video") {
    const { video_id } = req.body;
    const videoArr = new video(video_id);
    req.body.video_url = videoArr.getVideoUrl();
    // console.log(req.body.video);
  }

  if(type=='payment'){
    req.body.amount=Number(req.body.price)
  }
  if(type=='event'){
    for(let i=0;i<req.body.events.length;i++){
   req.body.events[i].event_id=req.body.events[i]._id
    }
  }
  const additionalLesson = new AdditionalLesson(req.body);
  await additionalLesson.save();


/*
//  const course = await Course.findById(config.COURSE_ID).select('units');
//  const index =  course.units.findIndex((item) => item.unit_id ==unit_id);

//  const values = Object.values(count);

//  const sum = values.reduce((accumulator, value) => {
//    return accumulator + value;
//  }, 0);

//  course.units[index].total_AdditionalLessons=sum;
 

//  console.log("sum h BAWAAAA",sum);
//  console.log("AdditionalLessons COUNT h ye: ",count);
//  console.log( course.units[index]);

//  await course.save();

 
  //progress
//   await Course.findByIdAndUpdate(config.COURSE_ID, {
//     $inc: { total_AdditionalLessons: 1 }, //decrement AdditionalLessons
//   });
*/
  const { _id } = additionalLesson;
  const shortAdditionalLesson = new longLessonToShort(additionalLesson);
  

  shortLessonupdater(shortAdditionalLesson, unit_id);

  if (additionalLesson.type === "video") {
    const additionalLesson = await AdditionalLesson.findById(_id.toString()).select(
      "prerequisite unit_id title video_url type unit_id completion start_at total_time description thumbnail_url"
      );
      
      /*
    // console.log(AdditionalLesson);

    // await Course.findByIdAndUpdate(config.COURSE_ID, {
    //   $inc: { total_videos: 1 }, //decrement AdditionalLessons
    // });

    // await Unit.findOneAndUpdate(
    //   { unit_id },
    //   {
    //     $inc: { total_video: 1 }, //decrement AdditionalLessons
    //   }
    // );
*/
    return tsend(additionalLesson, "", res);
  } else if (additionalLesson.type === "event") {

    const additionalLesson = await AdditionalLesson.findById(_id.toString()).select(
      "title type completion prerequisite events "
    );
    // await Course.findByIdAndUpdate(config.COURSE_ID, {
    //   $inc: { total_events: 1 }, //decrement AdditionalLessons
    // });

    // console.log(AdditionalLesson);
    return tsend(additionalLesson, "", res);
  } else if (additionalLesson.type === "article") {
    const additionalLesson = await AdditionalLesson.findById(_id.toString()).select(
      "title type unit_id completion prerequisite head body "
    );

    // await Course.findByIdAndUpdate(config.COURSE_ID, {
    //   $inc: { total_articles: 1 }, //decrement AdditionalLessons
    // });

    // await Unit.findOneAndUpdate(
    //   { unit_id },
    //   {
    //     $inc: { total_articles: 1 }, //decrement AdditionalLessons
    //   }
    // );

    return tsend(additionalLesson, "", res);
  } else if (additionalLesson.type === "test") {
    const additionalLesson = await AdditionalLesson.findById(_id.toString()).select(
      "title type unit_id completion prerequisite num_question time_allowed questions"
    );

   
    return tsend(additionalLesson, "", res);
  } else if (additionalLesson.type === "payment") {
    const additionalLesson = await additionalLesson.findById(_id.toString()).select(
      "title type unit_id completion prerequisite amount price price_description"
    );
    // console.log(AdditionalLesson);
    return tsend(additionalLesson, "", res);
  } else if (additionalLesson.type === "assignment") {
    const additionalLesson = await AdditionalLesson.findById(_id.toString()).select(
      "title type unit_id completion prerequisite intro_vid body sample submitted_url placeholder status"
    );
    // console.log(AdditionalLesson);
    return tsend(additionalLesson, "", res);
  }

});
const read = catchAsyncError(async function (req, res, next) {
  const { lesson_id, unit_id, user_id } = req.body;

  const onlyAdditionalLesson = lesson_id //&& !unit_id;
  const onlyunit = !lesson_id && unit_id;
  const nothingProvided = !lesson_id && !unit_id;
 

  const unitProgress = await Progress.findOne({ user_id, unit_id });

  // if(!unitProgress){
  //     return next(new errorHandler('No progress found',404));
  // }

  // const obj={}
  // obj['62f3f716088e0c7a694a6bb4']='1660155813697'
  // let obj1={}
  // obj1['62f3f6bd088e0c7a694a6bb2']='1660151960229'

  // unitProgress={
  //     completed_AdditionalLessons:[]
  // }
  // unitProgress.completed_AdditionalLessons.push(obj)
  // unitProgress.completed_AdditionalLessons.push(obj1);

  //condition logic for function
  if (onlyAdditionalLesson) {
    // getAdditionalLessonById
    const AdditionalLesson = await AdditionalLesson.findById(lesson_id).select('type');
    const {type,_id}=AdditionalLesson;
    

    if (type === "video") {
      const AdditionalLesson = await AdditionalLesson.findById(_id.toString()).select(
        "prerequisite unit_id title video_url type unit_id completion start_at total_time description thumbnail_url"
      );
      console.log(AdditionalLesson);
    
      return tsend(AdditionalLesson, "", res);
    } else if (type === "event") {
      const AdditionalLesson = await AdditionalLesson.findById(_id.toString()).select(
        "title type completion prerequisite events "
      );
     
      console.log(AdditionalLesson);
      return tsend(AdditionalLesson, "", res);
    } else if (type === "article") {
      const AdditionalLesson = await AdditionalLesson.findById(_id.toString()).select(
        "title type unit_id completion prerequisite head body");
      console.log(AdditionalLesson);
      return tsend(AdditionalLesson, "", res);
    } else if (type === "test") {
      const AdditionalLesson = await AdditionalLesson.findById(_id.toString()).select(
        "title type unit_id completion prerequisite num_question time_allowed questions"
      );
    
      for(let i=0;i<AdditionalLesson.questions.length;i++){
        AdditionalLesson.questions[i].correct_option=undefined
      }
     
      return tsend(AdditionalLesson, "", res);
    } else if (type === "payment") {
      const AdditionalLesson = await AdditionalLesson.findById(_id.toString()).select(
        "title type unit_id completion prerequisite amount price price_description"
      );
      console.log(AdditionalLesson);
      return tsend(AdditionalLesson, "", res);
    } else if (type === "assignment") {
     
const assignment= await Assignment.findOne({lesson_id,user_id})
      if(assignment){
return tsend(assignment,'',res)
      }

      const AdditionalLesson = await AdditionalLesson.findById(_id.toString()).select(
        "title type unit_id completion prerequisite intro_vid body sample submitted_url placeholder status"
      );
      console.log(AdditionalLesson);
      return tsend(AdditionalLesson, "", res);
    }
    



    // const AdditionalLesson = await AdditionalLesson.findById(AdditionalLesson_id).select(
    //   " title type completion description start_at is_locked thumbnail_url total_time video_url"
    // );
    //
    if (!AdditionalLesson) {
      return next(new errorHandler("No AdditionalLesson found", 404));
    }

    if (!unitProgress) {
      if (!AdditionalLesson.prerequisite.has_prerequisite) {
        // AdditionalLesson.is_completed=false;
        return tsend(AdditionalLesson, "", res);
      }

      //prerequisite
      if (!prereqFunction(unitProgress, AdditionalLesson.prerequisite)) {
        tsend(AdditionalLesson, "", res);
      } else {
        tsend({ AdditionalLesson_id, is_locked: true }, "AdditionalLesson is locked", res);
      }
      //
    }
  } else if (onlyunit) {
    //get next AdditionalLesson user has to access
    const unitProgress = await Progress.findOne({ user_id, unit_id });
    const arr = unitProgress.completed_AdditionalLessons;
    if(!arr){
      return res.status(404).json({
success:true,
message:'none AdditionalLesson is completed found'
      })
    }
    let lastElement = arr.pop();
    const lastWatchedAdditionalLessonId = Object.keys(lastElement)[0];
    const unit = await Unit.findOne({ unit_id });
    const AdditionalLessonsArray = unit.AdditionalLessons;

    const index = arr.findIndex((object) => {
      return object.AdditionalLesson_id == lastWatchedAdditionalLessonId;
    });

    if (index !== -1) {
      const nextAdditionalLessonObject = arr[index + 1].AdditionalLesson_id;
      const nextAdditionalLessonid = nextAdditionalLessonObject.AdditionalLesson_id;
      const AdditionalLesson = await AdditionalLesson.findById(nextAdditionalLessonid);
      if (!AdditionalLesson) {
        return next(new errorHandler("No AdditionalLesson found", 404));
      }
    } else {
      next(new errorHandler("AdditionalLesson not found", 500));
    }

    //

    if (!prereqFunction(unitProgress, AdditionalLesson.prerequisite)) {
      //do stuff
      tsend(AdditionalLesson, "", res);
    } else {
      //do stuff
      tsend({ AdditionalLesson_id, is_locked: true }, "AdditionalLesson is locked", res);
    }

    tsend(unit, "", res);
  } else if (nothingProvided) {
    // console.log(unitProgress);

    //progress model se last lessn id nikalo
    const arr = unitProgress.completed_AdditionalLessons;

    let lastAdditionalLessonIdAccessedByUser = Object.keys(arr.pop())[0];
    // console.log(lastAdditionalLessonIdAccessedByUser);
    //

    // find AdditionalLesson
    const AdditionalLesson = await AdditionalLesson.findById(lastAdditionalLessonIdAccessedByUser);
    //
    // console.log(AdditionalLesson);

    //check prerequisite
    if (!prereqFunction(unitProgress, AdditionalLesson.prerequisite)) {
      console.log(unitProgress);
      console.log(AdditionalLesson.prerequisite);
      tsend(AdditionalLesson, "", res);
    } else {
      tsend(
        { lastAdditionalLessonIdAccessedByUser, is_locked: true },
        "AdditionalLesson is locked",
        res
      );
    }
    //
  }
});

const remove = catchAsyncError(async function (req, res,next) {
  const { lesson_id } = req.body;
  const additionalLesson = await AdditionalLesson.findById(lesson_id);
  console.log(additionalLesson)
    const { unit_id } = additionalLesson;
  if (!additionalLesson) {
    return next(new errorHandler("No AdditionalLesson found", 404));
  }
  const unit = await Unit.findById(additionalLesson.unit_id);
  if (!unit) {
    return next(new errorHandler("No unit found", 404));
  }
  const index = unit.additionals.findIndex((item) => item.lesson_id ==lesson_id);
  if (index == -1) {
    return next(new errorHandler("No short additional lesson found in unit ", 404));
  }
  console.log(index);
  console.log(unit.additionals);
  unit.additionals.splice(index, 1);
  await unit.save();
  await additionalLesson.remove();


/*
//   await Course.findByIdAndUpdate(config.COURSE_ID, {
//     $inc: { total_AdditionalLessons: -1 }, //decrement AdditionalLessons
//   });

  if (AdditionalLesson.type === "video") {
    await Course.findByIdAndUpdate(config.COURSE_ID, {
      $inc: { total_videos: -1 }, //decrement AdditionalLessons
    });
    await Unit.findOneAndUpdate(
      { unit_id },
      {
        $inc: { total_video: -1 }, //decrement AdditionalLessons
      }
    );
  } else if (AdditionalLesson.type === "event") {
    await Course.findByIdAndUpdate(config.COURSE_ID, {
      $inc: { total_events: -1 }, //decrement AdditionalLessons
    });
  } else if (AdditionalLesson.type === "article") {
    await Course.findByIdAndUpdate(config.COURSE_ID, {
      $inc: { total_articles: -1 }, //decrement AdditionalLessons
    });
    await Unit.findOneAndUpdate(
      { unit_id },
      {
        $inc: { total_articles: -1 }, //decrement AdditionalLessons
      }
    );
  } else if (AdditionalLesson.type === "test") {
    await Course.findByIdAndUpdate(config.COURSE_ID, {
      $inc: { total_tests: -1 }, //decrement AdditionalLessons
    });

    await Unit.findOneAndUpdate(
      { unit_id },
      {
        $inc: { total_test: -1 }, //decrement AdditionalLessons
      }
    );
  }

  // else if(AdditionalLesson.type==='payment'){

  // return tsend(AdditionalLesson,'',res);
  // }
  // else if(AdditionalLesson.type==='assignment'){
  //     const AdditionalLesson= await AdditionalLesson.findById(_id.toString()).select('title type unit_id completion prerequisite intro_vid body sample submitted_url placeholder status')
  //     console.log(AdditionalLesson);
  // return tsend(AdditionalLesson,'',res);
  // }


//   const count=await countAdditionalLesson(unit_id);


  await Unit.findByIdAndUpdate(unit_id,count)
  
  */


  //   const course = await Course.findById(config.COURSE_ID).select('units');
//   const index1 =  course.units.findIndex((item) => item.unit_id ==unit_id);
//   course.units[index1].total_AdditionalLessons=count;
  

  res.status(200).json({
    success: true,
    message: "deleted successfully",
  });
});

const update = catchAsyncError(async function (req, res,next) {
  const { AdditionalLesson_id, user_id } = req.body;
  await AdditionalLesson.findByIdAndUpdate(AdditionalLesson_id, req.body);
  const AdditionalLesson = await AdditionalLesson.findById(AdditionalLesson_id);

  const { unit_id } = AdditionalLesson;
  const unit = await Unit.findById(unit_id);
  const index = unit.AdditionalLessons.findIndex((item) => item.AdditionalLesson_id == AdditionalLesson_id);
  unit.AdditionalLessons[index] = new longAdditionalLessonToShort(AdditionalLesson);
  await unit.save();
  res.status(200).json({ success: true, message: "updated successfully" });
});

const completedAdditionalLesson = catchAsyncError(async function (req, res, next) {
  const { user_id, AdditionalLesson_id, unit_id } = req.body;
  const timestamp = Date.now();
  //user_id
  const { type } = await AdditionalLesson.findById(AdditionalLesson_id).select("type");

  //AdditionalLesson_id
  //unit_id
  let progress = await Progress.findOne({ user_id, unit_id });
  // console.log(unit_id);
  let {AdditionalLessons}= await Unit.findById(unit_id);
 

  // 
  if (!progress) {
    progress = new Progress({
      user_id,
      unit_id,
    });
  }
  
  ///user model   me progress
 
await User.findOneAndUpdate({user_id},{

  $inc:{AdditionalLessons_completed:1}
})

if(type==='video'){
  await User.findOneAndUpdate({user_id},{

    $inc:{video_watched:1}
  })
}
else if(type==='test'){
  await User.findOneAndUpdate({user_id},{

    $inc:{test_given:1}
  })

}


///


    // if (type === "video") {
    //   progress.completed_videos++;
    // }
    // console.log('progress');

    const obj = {};
    obj[AdditionalLesson_id] = timestamp;

    // console.log(obj);


    const alreadyExist = progress.completed_AdditionalLessons.some((o) => AdditionalLesson_id in o);
    // console.log(alreadyExist);
    if (!alreadyExist){ progress.completed_AdditionalLessons.push(obj);//
    

      let flag=1;
      const user = await User.findOne({user_id});
      for(let i=0;i<user.units_progress.length;i++){
        if(unit_id == user.units_progress[i].unit_id){
          user.units_progress[i].AdditionalLessons_completed=user.units_progress[i].AdditionalLessons_completed+1;
          flag=0;
          break;
        } 
        //##progress model 
      }
      
      if(flag){
        let obj={}
      
        obj.unit_id=unit_id
        obj.AdditionalLessons_completed=1

        user.units_progress.push(obj);
        
      
      }



      //

      // console.log(checkIfUnitCompleted(AdditionalLessons, progress.completed_AdditionalLessons));
      if (checkIfUnitCompleted(AdditionalLessons, progress.completed_AdditionalLessons)) {
      
        const obj = {};
        obj[unit_id] = timestamp;
        const alreadyExist = user.units_completed.some((o) => unit_id in o);
        if (!alreadyExist) {
          user.units_completed.push(obj);
        } 
        else {
          const index = user.units_completed.findIndex((o) => unit_id in o);
          user.units_completed[index][unit_id] = timestamp;
        }
     
       
  
      }
      

      //


     await  progress.save();
      await user.save();
      //TODO:add completed evaluated field in progress model
     return tsend({}, "completed AdditionalLesson updated successfuly", res);
  }
  // console.log(progress);


  /*

 agar AdditionalLesson koi completed hua to user increment kro agar nahi h to ek value push kro ek de do value
 
*/


let flag=1;
const user = await User.findOne({user_id});
for(let i=0;i<user.units_progress.length;i++){
  if(unit_id ==user.units_progress[i].unit_id){
    user.units_progress[i]=user.units_progress[i]+1;
    flag=0;
    break;
  } 
  //##progress model 
}

if(flag){
  let obj={}
  obj.unit_id=unit_id
        obj.AdditionalLessons_completed=1
  user.units_progress.push(obj);

}

await user.save();




  





  return tsend({}, "AdditionalLesson already completed", res);
});

const updateAdditionalLessonPosition = catchAsyncError(async function (req, res, next) {
  let { AdditionalLessons, unit_id } = req.body;

  let unit = await Unit.findById(unit_id).select("AdditionalLessons");

  AdditionalLessonArray = unit.AdditionalLessons;
  //destruct userId and newIndex
  AdditionalLessons.forEach(async (unit) => {
    let { AdditionalLesson_id, index } = unit;
    const indexOfTargetAdditionalLesson = AdditionalLessonArray.findIndex(
      (e) => e.AdditionalLesson_id == AdditionalLesson_id
    );
    // console.log(indexOfTargetAdditionalLesson);
    AdditionalLessonArray[indexOfTargetAdditionalLesson].index = index;
  });
  AdditionalLessonArray.sort((a, b) => a.index - b.index);
  // console.log(unitArray);
  await unit.save();

  res.status(200).json({ success: true, message: "updated successfully" });
});




const startAdditionalLesson = catchAsyncError(async function (req, res, next) {
  const { user_id, AdditionalLesson_id, unit_id } = req.body;
  const timestamp = Date.now();

  const { unit_name,title,type} = await AdditionalLesson.findById(AdditionalLesson_id).select("title type unit_name").lean();
 
 const last_AdditionalLesson={
  title,
  AdditionalLesson_id
}
const last_unit={
  unit_id,
  unit_name
}

  let progress = await Progress.exists({ user_id, unit_id });
  console.log(progress);
  if (!progress) {
    progress = new Progress({
      user_id,
      unit_id,
    });
  }




  await User.findOneAndUpdate({user_id},{
      $set:{
        last_AdditionalLesson,
        last_unit
      }
    })

  tsend({}, "AdditionalLesson started successfuly", res);
});



const paymentForAdditionalLesson = catchAsyncError(async function (req, res, next) {
const {user_id,AdditionalLesson_id,unit_id}=req.body;
const payment=await AdditionalLesson.findById(AdditionalLesson_id).select('amount type price description').lean();
if(!payment){
  return tsend({}, "AdditionalLesson not found", res);
}
if(payment.type!='payment'){
  return tsend({}, "AdditionalLesson not payment type", res);
}


res.redirect('/edtech/payment/checkout?amount='+payment.amount+'&description='+payment.description+'&AdditionalLesson_id='+AdditionalLesson_id+'&unit_id='+unit_id+'&user_id='+user_id);



})

module.exports = {
  list,
  read,
  update,
  completedAdditionalLesson,
  startAdditionalLesson,
  updateAdditionalLessonPosition,
  create,
  remove,
  paymentForAdditionalLesson 
};




