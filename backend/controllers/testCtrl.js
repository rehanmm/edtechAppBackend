const Lesson = require("../models/lessonModel");
const Progress = require("../models/progressModel");
const express = require("express");
const mongoose = require("mongoose");
const catchAsyncError = require("../error/catchAsyncError");
const errorHandler = require("../utils/errorHandler");
const { send, tsend } = require("../middleware/responseSender");

const startTest = catchAsyncError(async function (req, res) {
  const { lesson_id, unit_id, user_id } = req.body;
  const test = await Lesson.findById(lesson_id).select(
    "title num_question time_allowed questions"
  );
  for(let i=0;i<test.questions.length;i++){
    test.questions[i].correct_option=undefined
  }

  
  let testProgress = await Progress.findOne({ user_id, unit_id }); //.select('test_answers option_choosed test_evaluation test_taken avg_test_score');
  // console.log(testProgress)
  const arr = testProgress.test_evaluation;
  startTime = Date.now();
  const test_record = {
    lesson_id: lesson_id,
    start_time: startTime,
    submit_time: undefined,
    test_score: undefined,
  };

  arr.push(test_record);

  // const index = arr.findIndex(object => {
  //     return object.lesson_id == lesson_id}
  // )
  // if (index !== -1) {
  //     arr[index].name = 'John';
  //   }
  await testProgress.save();
  tsend(test, "Test started successfully", res);
  // testProgress.test_evaluation[lesson_id]
});


const submitTest = catchAsyncError(async function (req, res, next) {
  const { lesson_id, unit_id, user_id, answers } = req.body;
  const testProgress = await Progress.findOne({ user_id, unit_id }).select(
    'test_evaluation tests_submitted_answers avg_test_score test_taken completed_lessons'
    );


    const alreadyExist = testProgress.completed_lessons.some((o) => lesson_id in o);
    // console.log(alreadyExist);
//     if (alreadyExist){ 
//         return res.status(200).json({
//             success:true,
//             message:'test is already submitted'
//         });
  
    
//   }
  /*answers
1.test_evaluation--lesson_id start_time end_time test_score
2.avg score
3.tests_submitted_answers---answers me status
*/
  const { questions,time_allowed ,title} = await Lesson.findById(lesson_id).select("questions").lean();
  const num_question=questions.length
const total_marks=num_question*1;
  let awarded_marks = 0,
    num_correct = 0,
    num_wrong = 0,
    submitted_answers={};


  questions.forEach(function ({_id,correct_option},questionIndex) {
    console.log(questionIndex)
      const index = answers.findIndex(
          (value) =>value.question_id == _id.toString()
    );

    if (index != -1) {
        if(answers[index].option_choosed==correct_option)
     { 
         questions[questionIndex].chosen_option=answers[index].option_choosed
        questions[questionIndex].awarded_marks=awarded_marks;
        questions[questionIndex].max_marks=1;
        questions[questionIndex].status = "correct";
        answers[index].status = "correct";
        awarded_marks++;
      num_correct++;
    }
    else {
        questions[questionIndex].chosen_option=answers[index].option_choosed
        questions[questionIndex].status ="wrong";
      answers[index].status= "wrong";
      num_wrong++;
    }
}
  });
  submitted_answers.lesson_id=lesson_id;
  submitted_answers.answers=answers;
  
  
 
    //   console.log(submitted_answers)
      
  testProgress.tests_submitted_answers.push(submitted_answers);

  const arr = testProgress.test_evaluation;
  const submitTime = Date.now(); 
  const index = arr.findIndex((object) => {
    return object.lesson_id == lesson_id;
  });
  if (index !== -1) {
    arr[index].submit_time = submitTime;
    arr[index].awarded_marks = awarded_marks;
    arr[index].correct_answers = num_correct;
    arr[index].wrong_answers = num_wrong;
    // testProgress.avg_test_score=((testProgress.avg_test_score*testProgress.test_taken+test_score)/(testProgress.test_taken+1));
    testProgress.test_taken=testProgress.test_taken+1;

  } else {
   return next({success:true,message:'you cannot submit test before start'});
  }


//

const obj={}
obj[lesson_id]=submitTime
testProgress.completed_lessons.push(obj);



//
  await testProgress.save();
  tsend({
    title,
    num_question,
time_allowed,
awarded_marks,
total_marks,
num_correct,
num_wrong,
questions

  }, "Test submitted successfuly", res);
});

// const submitTest=catchAsyncError(async function(req,res){

// })

module.exports = { startTest, submitTest };
