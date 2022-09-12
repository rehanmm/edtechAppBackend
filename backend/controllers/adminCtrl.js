const Question = require("../models/questionModel");
const User = require("../models/userModel");
const Progress = require("../models/progressModel");
const Lesson = require("../models/lessonModel");
const Assignment = require("../models/assignmentModel");
const Answer = require("../models/answerModel");
const express = require("express");
const mongoose = require("mongoose");
const catchAsyncError = require("../error/catchAsyncError");
const errorHandler = require("../utils/errorHandler");
const { tsend, send } = require("../middleware/responseSender");
const paginationAndSearch=require('../utils/genaeralFilter')

const Qlist = catchAsyncError(async function (req, res, next) {
  const filter = req.body;
  let where = {};
  if (filter.user_id) {
    next(new errorHandler(400, "user_id is required"));
  }
  let query = Question.find({question_id:filter.question_id });
  const page = parseInt(filter.page) || 1;
  const pageSize = parseInt(filter.limit) || 10;
  const skip = (page - 1) * pageSize;
  const total = await Question.countDocuments(where);
  const pages = Math.ceil(total / pageSize);

  if (page > pages) {
    return res.status(404).json({
      success: "true",
      message: "No page found",
    });
  }
  result = await query.skip(skip).limit(pageSize).sort({ createdAt: -1 });
  res.json({
    success: true,
    filter,
    count: result.length,
    page,
    pages,
    data: { questions: result },
  });
});


const QToplist = catchAsyncError(async function (req, res, next) {
  const filter = req.body;
  let where = {};
  if (filter.user_id) {
    next(new errorHandler(400, "User_id is required"));
  }
  let query = Question.find({});
  const page = parseInt(filter.page) || 1;
  const pageSize = parseInt(filter.limit) || 10;
  const skip = (page - 1) * pageSize;
  const total = await Question.countDocuments(where);
  const pages = Math.ceil(total / pageSize);

  if (page > pages) {
    return res.status(404).json({
      success: "true",
      message: "No page found",
    });
  }
  result = await query.skip(skip).limit(pageSize).sort({ createdAt: -1 });
  res.json({
    total,
    success: true,
    filter,
    count: result.length,
    page,
    pages,
    data: { questions: result },
  });
});

const Qcreate = catchAsyncError(async function (req, res,next) {
  const question = new Question(req.body);
  // question.popularityIndex();
  await question.save();
  tsend(question, "", res);
});
const Qread = catchAsyncError(async function (req, res,next) {
  const { question_id } = req.body;
  const question = await Question.findById(question_id);
  const answers = await Answer.find({ question_id }).sort({ upvote: -1 });
  tsend({ question, answers }, "", res);
});
const Qremove = catchAsyncError(async function (req, res,next) {
  const { question_id } = req.body;
  const question = await Question.findById(question_id);
  await question.remove();

  tsend({ question_id: question._id }, "question deleted successfully", res);
});

const Qupdate = catchAsyncError(async function (req, res,next) {
  await Question.findByIdAndUpdate(req.body.question_id, req.body);
  const updatedvalue = await Question.findById(req.body.question_id);
  tsend(updatedvalue, "updated successfully", res);
});

const Alist = catchAsyncError(async function (req, res,next) {
 
let where={}
if(req.body.keyword){
  where = {$or:[{head:{$regex: req.body.keyword, $options: 'i'}},{body:{$regex: req.body.keyword, $options: 'i'}}]}
}

 await paginationAndSearch(where,req.body,Answer,res)
  
});

const Acreate = catchAsyncError(async function (req, res,next) {
  const answer = new Answer(req.body);
  await answer.save();
  tsend(answer, "", res);
});
const Aremove = catchAsyncError(async function (req, res,next) {
  const { answer_id } = req.body;
  const answer = await Answer.findById(answer_id);
  await answer.remove();

  tsend({}, "message deleted successfully", res);
});

const Aupdate = catchAsyncError(async function (req, res,next) {
  await Answer.findByIdAndUpdate(req.body.answer_id, req.body);
  const updatedvalue = await Answer.findById(req.body.answer_id);
  tsend(updatedvalue, "updated successfully", res);
});
const userInfo = catchAsyncError(async function (req, res,next) {
  const { user_id } = req.body;
  //TODO: find by id ko find one karo
  const user = await User.findOne({user_id}).select("-password -salt -__v");
  const progress = await Progress.find({ user_id });
  const question = await Question.find({ user_id });
  const answer = await Answer.find({user_id});
  // const total_question = question.length;
  // const total_answer = answer.length;
  const assignment = await Assignment.find({ user_id}).lean();
  const manual_lessons = await Lesson.find({ completion: "manual" });
  // const total_assignment=assignment.length;

  tsend(
    {
      user,
      progress,
      forum_questions: question,
      forum_answers: answer,
      uploaded_assignment: assignment,
      manual_lessons
    },
    "",
    res
  );
});

module.exports = {
  userInfo,
  Qlist,
  QToplist,
  Qread,
  Qupdate,
  Qcreate,
  Qremove,
  Alist,
  Aupdate,
  Acreate,
  Aremove,
};
