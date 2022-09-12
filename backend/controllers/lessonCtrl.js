const Lesson = require("../models/lessonModel");
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
const shortLessonupdater = require("../helpers/shortLessonUpdater");
const video = require("../helpers/lessonHelpers.js/videoUrlProcessing");
const config = require("../config/config");

const list = catchAsyncError(async function (req, res,next) {
  const lesson = await Lesson.find({ unit_id: req.body.unit_id });
  if (!lesson) {
    return next(new errorHandler("No lesson found", 404));
  }
  tsend(lesson, "", res);
});

const create = catchAsyncError(async function (req, res, next) {
  console.log(req.body);
  //TODO: add unit name to lesson
  const { unit_id, type } = req.body;
  if (type == "video") {
    const { video_id } = req.body;
    const videoArr = new video(video_id);
    req.body.video_url = videoArr.getVideoUrl();
    console.log(req.body.video);
  }
  const lesson = new Lesson(req.body);
  await lesson.save();
  //progress
  await Course.findByIdAndUpdate(config.COURSE_ID, {
    $inc: { total_lessons: 1 }, //decrement lessons
  });

  const { _id } = lesson;
  const shortLesson = new longLessonToShort(lesson);
  console.log(shortLesson);
  // const unitLessonUpdate = await Unit.findOneAndUpdate(shortLesson,unit_id);
  shortLessonupdater(shortLesson, unit_id);

  if (lesson.type === "video") {
    const lesson = await Lesson.findById(_id.toString()).select(
      "prerequisite unit_id title video_url type unit_id completion start_at total_time description thumbnail_url"
    );
    console.log(lesson);

    await Course.findByIdAndUpdate(config.COURSE_ID, {
      $inc: { total_videos: 1 }, //decrement lessons
    });

    await Unit.findOneAndUpdate(
      { unit_id },
      {
        $inc: { total_video: 1 }, //decrement lessons
      }
    );

    return tsend(lesson, "", res);
  } else if (lesson.type === "event") {
    const lesson = await Lesson.findById(_id.toString()).select(
      "title type completion prerequisite events "
    );
    await Course.findByIdAndUpdate(config.COURSE_ID, {
      $inc: { total_events: 1 }, //decrement lessons
    });

    console.log(lesson);
    return tsend(lesson, "", res);
  } else if (lesson.type === "article") {
    const lesson = await Lesson.findById(_id.toString()).select(
      "title type unit_id completion prerequisite head body "
    );

    await Course.findByIdAndUpdate(config.COURSE_ID, {
      $inc: { total_articles: 1 }, //decrement lessons
    });

    await Unit.findOneAndUpdate(
      { unit_id },
      {
        $inc: { total_articles: 1 }, //decrement lessons
      }
    );

    console.log(lesson);
    return tsend(lesson, "", res);
  } else if (lesson.type === "test") {
    const lesson = await Lesson.findById(_id.toString()).select(
      "title type unit_id completion prerequisite num_question time_allowed questions"
    );

    await Course.findByIdAndUpdate(config.COURSE_ID, {
      $inc: { total_tests: 1 }, //decrement lessons
    });

    await Unit.findOneAndUpdate(
      { unit_id },
      {
        $inc: { total_test: 1 }, //decrement lessons
      }
    );
    console.log(lesson);
    return tsend(lesson, "", res);
  } else if (lesson.type === "payment") {
    const lesson = await Lesson.findById(_id.toString()).select(
      "title type unit_id completion prerequisite amount price price_description"
    );
    console.log(lesson);
    return tsend(lesson, "", res);
  } else if (lesson.type === "assignment") {
    const lesson = await Lesson.findById(_id.toString()).select(
      "title type unit_id completion prerequisite intro_vid body sample submitted_url placeholder status"
    );
    console.log(lesson);
    return tsend(lesson, "", res);
  }

});
const read = catchAsyncError(async function (req, res, next) {
  const { lesson_id, unit_id, user_id } = req.body;
  // console.log(unit_id);
  const onlyLesson = lesson_id && !unit_id;
  const onlyunit = !lesson_id && unit_id;
  const nothingProvided = !lesson_id && !unit_id;
  // console.log(nothingProvided);

  const unitProgress = await Progress.findOne({ user_id, unit_id });

  // if(!unitProgress){
  //     return next(new errorHandler('No progress found',404));
  // }

  // const obj={}
  // obj['62f3f716088e0c7a694a6bb4']='1660155813697'
  // let obj1={}
  // obj1['62f3f6bd088e0c7a694a6bb2']='1660151960229'

  // unitProgress={
  //     completed_lessons:[]
  // }
  // unitProgress.completed_lessons.push(obj)
  // unitProgress.completed_lessons.push(obj1);

  //condition logic for function
  if (onlyLesson) {
    // getLessonById
    const lesson = await Lesson.findById(lesson_id).select('type');

const {type,_id}=lesson;

    if (type === "video") {
      const lesson = await Lesson.findById(_id.toString()).select(
        "prerequisite unit_id title video_url type unit_id completion start_at total_time description thumbnail_url"
      );
      console.log(lesson);
    
      return tsend(lesson, "", res);
    } else if (type === "event") {
      const lesson = await Lesson.findById(_id.toString()).select(
        "title type completion prerequisite events "
      );
     
      console.log(lesson);
      return tsend(lesson, "", res);
    } else if (type === "article") {
      const lesson = await Lesson.findById(_id.toString()).select(
        "title type unit_id completion prerequisite head body");
      console.log(lesson);
      return tsend(lesson, "", res);
    } else if (type === "test") {
      const lesson = await Lesson.findById(_id.toString()).select(
        "title type unit_id completion prerequisite num_question time_allowed questions"
      );
    
      for(let i=0;i<lesson.questions.length;i++){
        lesson.questions[i].correct_option=undefined
      }
     
      return tsend(lesson, "", res);
    } else if (type === "payment") {
      const lesson = await Lesson.findById(_id.toString()).select(
        "title type unit_id completion prerequisite amount price price_description"
      );
      console.log(lesson);
      return tsend(lesson, "", res);
    } else if (type === "assignment") {
const assignment= await Assignment.findOne({lesson_id})
      if(assignment){
return tsend(assignment,'',res)
      }

      const lesson = await Lesson.findById(_id.toString()).select(
        "title type unit_id completion prerequisite intro_vid body sample submitted_url placeholder status"
      );
      console.log(lesson);
      return tsend(lesson, "", res);
    }
    



    // const lesson = await Lesson.findById(lesson_id).select(
    //   " title type completion description start_at is_locked thumbnail_url total_time video_url"
    // );
    //
    if (!lesson) {
      return next(new errorHandler("No lesson found", 404));
    }

    if (!unitProgress) {
      if (!lesson.prerequisite.has_prerequisite) {
        // lesson.is_completed=false;
        return tsend(lesson, "", res);
      }

      //prerequisite
      if (!prereqFunction(unitProgress, lesson.prerequisite)) {
        tsend(lesson, "", res);
      } else {
        tsend({ lesson_id, is_locked: true }, "lesson is locked", res);
      }
      //
    }
  } else if (onlyunit) {
    //get next lesson user has to access
    const unitProgress = await Progress.findOne({ user_id, unit_id });
    const arr = unitProgress.completed_lessons;
    if(!arr){
      return res.status(404).json({
success:true,
message:'none lesson is completed found'
      })
    }
    let lastElement = arr.pop();
    const lastWatchedLessonId = Object.keys(lastElement)[0];
    const unit = await Unit.findOne({ unit_id });
    const lessonsArray = unit.lessons;

    const index = arr.findIndex((object) => {
      return object.lesson_id == lastWatchedLessonId;
    });

    if (index !== -1) {
      const nextLessonObject = arr[index + 1].lesson_id;
      const nextLessonid = nextLessonObject.lesson_id;
      const lesson = await Lesson.findById(nextLessonid);
      if (!lesson) {
        return next(new errorHandler("No lesson found", 404));
      }
    } else {
      next(new errorHandler("lesson not found", 500));
    }

    //

    if (!prereqFunction(unitProgress, lesson.prerequisite)) {
      //do stuff
      tsend(lesson, "", res);
    } else {
      //do stuff
      tsend({ lesson_id, is_locked: true }, "lesson is locked", res);
    }

    tsend(unit, "", res);
  } else if (nothingProvided) {
    // console.log(unitProgress);

    //progress model se last lessn id nikalo
    const arr = unitProgress.completed_lessons;

    let lastLessonIdAccessedByUser = Object.keys(arr.pop())[0];
    // console.log(lastLessonIdAccessedByUser);
    //

    // find lesson
    const lesson = await Lesson.findById(lastLessonIdAccessedByUser);
    //
    // console.log(lesson);

    //check prerequisite
    if (!prereqFunction(unitProgress, lesson.prerequisite)) {
      console.log(unitProgress);
      console.log(lesson.prerequisite);
      tsend(lesson, "", res);
    } else {
      tsend(
        { lastLessonIdAccessedByUser, is_locked: true },
        "lesson is locked",
        res
      );
    }
    //
  }
});

const remove = catchAsyncError(async function (req, res,next) {
  const { lesson_id } = req.body;
  const lesson = await Lesson.findById(req.body.lesson_id);
  if (!lesson) {
    return next(new errorHandler("No lesson found", 404));
  }
  const unit = await Unit.findById(lesson.unit_id);
  if (!unit) {
    return next(new errorHandler("No unit found", 404));
  }
  const index = unit.lessons.findIndex((item) => item.lesson_id == lesson_id);
  if (index == -1) {
    return next(new errorHandler("No short lesson found in unit ", 404));
  }
  console.log(index);
  console.log(unit.lessons);
  unit.lessons.splice(index, 1);
  await unit.save();
  await lesson.remove();

  await Course.findByIdAndUpdate(config.COURSE_ID, {
    $inc: { total_lessons: -1 }, //decrement lessons
  });

  if (lesson.type === "video") {
    await Course.findByIdAndUpdate(config.COURSE_ID, {
      $inc: { total_videos: -1 }, //decrement lessons
    });
    await Unit.findOneAndUpdate(
      { unit_id },
      {
        $inc: { total_video: -1 }, //decrement lessons
      }
    );
  } else if (lesson.type === "event") {
    await Course.findByIdAndUpdate(config.COURSE_ID, {
      $inc: { total_events: -1 }, //decrement lessons
    });
  } else if (lesson.type === "article") {
    await Course.findByIdAndUpdate(config.COURSE_ID, {
      $inc: { total_articles: -1 }, //decrement lessons
    });
    await Unit.findOneAndUpdate(
      { unit_id },
      {
        $inc: { total_articles: -1 }, //decrement lessons
      }
    );
  } else if (lesson.type === "test") {
    await Course.findByIdAndUpdate(config.COURSE_ID, {
      $inc: { total_tests: -1 }, //decrement lessons
    });

    await Unit.findOneAndUpdate(
      { unit_id },
      {
        $inc: { total_test: -1 }, //decrement lessons
      }
    );
  }

  // else if(lesson.type==='payment'){

  // return tsend(lesson,'',res);
  // }
  // else if(lesson.type==='assignment'){
  //     const lesson= await Lesson.findById(_id.toString()).select('title type unit_id completion prerequisite intro_vid body sample submitted_url placeholder status')
  //     console.log(lesson);
  // return tsend(lesson,'',res);
  // }

  res.status(200).json({
    success: true,
    message: "deleted successfully",
  });
});

const update = catchAsyncError(async function (req, res,next) {
  const { lesson_id, user_id } = req.body;
  await Lesson.findByIdAndUpdate(lesson_id, req.body);
  const lesson = await Lesson.findById(lesson_id);

  const { unit_id } = lesson;
  const unit = await Unit.findById(unit_id);
  const index = unit.lessons.findIndex((item) => item.lesson_id == lesson_id);
  unit.lessons[index] = new longLessonToShort(lesson);
  await unit.save();
  res.status(200).json({ success: true, message: "updated successfully" });
});

const completedLesson = catchAsyncError(async function (req, res, next) {
  const { user_id, lesson_id, unit_id } = req.body;
  const timestamp = Date.now();
  //user_id
  const { type } = await Lesson.findById(lesson_id).select("type");

  //lesson_id
  //unit_id

  let progress = await Progress.findOne({ user_id, unit_id });
  // 
  if (!progress) {
    progress = new Progress({
      user_id,
      unit_id,
    });
  }

  //##progress model 
await User.findOneAndUpdate({user_id},{

  $inc:{lessons_completed:1}
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
    obj[lesson_id] = timestamp;

    // console.log(obj);

    const alreadyExist = progress.completed_lessons.some((o) => user_id in o);
    // console.log(alreadyExist);
    if (!alreadyExist){ progress.completed_lessons.push(obj);
      progress.save();
      //TODO:add completed evaluated field in progress model
     return tsend({}, "completed lesson updated successfuly", res);
  }
  // console.log(progress);

  return tsend({}, "lesson already completed", res);
});

const updateLessonPosition = catchAsyncError(async function (req, res, next) {
  let { lessons, unit_id } = req.body;

  let unit = await Unit.findById(unit_id).select("lessons");

  lessonArray = unit.lessons;
  //destruct userId and newIndex
  lessons.forEach(async (unit) => {
    let { lesson_id, index } = unit;
    const indexOfTargetLesson = lessonArray.findIndex(
      (e) => e.lesson_id == lesson_id
    );
    // console.log(indexOfTargetLesson);
    lessonArray[indexOfTargetLesson].index = index;
  });
  lessonArray.sort((a, b) => a.index - b.index);
  // console.log(unitArray);
  await unit.save();

  res.status(200).json({ success: true, message: "updated successfully" });
});




const startLesson = catchAsyncError(async function (req, res, next) {
  const { user_id, lesson_id, unit_id } = req.body;
  const timestamp = Date.now();

  const { unit_name,title,type} = await Lesson.findById(lesson_id).select("title type unit_name").lean();
 
 const last_lesson={
  title,
  lesson_id
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
        last_lesson,
        last_unit
      }
    })

  tsend({}, "lesson started successfuly", res);
});

module.exports = {
  list,
  read,
  update,
  completedLesson,
  startLesson,
  updateLessonPosition,
  create,
  remove,
};




