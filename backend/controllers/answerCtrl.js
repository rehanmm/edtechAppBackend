const Answer = require("../models/answerModel");
const express = require("express");
const mongoose = require("mongoose");
const catchAsyncError = require("../error/catchAsyncError");
const errorHandler = require("../utils/errorHandler");
const { tsend, send } = require("../middleware/responseSender");
const Question = require("../models/questionModel");

const list = catchAsyncError(async function (req, res,next) {
  const answer = await Answer.find({}).lean();
  tsend(answer, "", res);
});

const create = catchAsyncError(async function (req, res,next) {
  //  const question_id=req.body.question_id;
  //  const question= await Question.findOne({question_id});
  //  question.total_comment++;
  //  question.popularityIndex();
  const { user_id, question_id } = req.body;
  const {user_name,display_picture}= await User.findOne({user_id}).select('user_name,display_picture');
  await User.findByIdAndUpdate(
    user_id,
    { $inc: { total_answer_given: 1 } },
    { new: true }
  );
  await Question.findByIdAndUpdate(
    question_id,
    { $inc: { total_answers: 1 } },
    { new: true }
  );
  //TODO: analytics udpate

  //  question.save();
  const answer = new Answer(user_name,display_picture,...req.body);
  await answer.save();
  tsend(answer, "", res);
});
const read = catchAsyncError(function (req, res) {
  
});
const remove = catchAsyncError(async function (req, res,next) {
  const { answer_id, user_id } = req.body;

  await User.findOneAndUpdate(
    {user_id},
    { $inc: { total_answer_given: -1 } },
    { new: true }
  );

  await Question.findByIdAndUpdate(
    question_id,
    { $inc: { total_answers: 1 } },
    { new: true }
  );
  const answer = await Answer.findById(answer_id);
  await answer.remove();

  tsend({}, "message deleted successfully", res);
});

const update = catchAsyncError(async function (req, res,next) {
  await Answer.findByIdAndUpdate(req.body.answer_id, req.body);
  const updatedvalue = await Answer.findById(req.body.answer_id);
  tsend(updatedvalue, "updated successfully", res);
});

const upvote = catchAsyncError(async function (req, res,next) {
  const { user_id, answer_id } = req.body;

  const answer = await Answer.findById(answer_id);
  if (answer.likes.includes(user_id)) {
    answer.upvotes.pull(user_id);
    const value = answer.total_upvote;
    answer.total_upvote = value - 1;
  } else {
    const value = question.total_upvote;
    question.total_upvote = value + 1;
    answer.upvotes.push(user_id);
  }
  await question.save();
  //   const updatedvalue=await Question.findById(req.body.question_id)
  tsend({}, "", res);
});

module.exports = { list, read, update, upvote, create, remove };
