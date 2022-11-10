const catchAsyncError = require("../error/catchAsyncError");
const errorHandler = require("../utils/errorHandler");
const { send, tsend } = require("../middleware/responseSender");
const Feedback = require("../models/feedbackModel");


const createFeedback = catchAsyncError(async (req, res, next) => {
    const { user_id,feedback:feed,timestamp,version_code,rating } = req.body;
    const feedback = new Feedback({
        user_id,
        feedback: feed,
        timestamp,
        version_code,
        rating,
    });
    await feedback.save();
    tsend(feedback, 'Feedback created successfully', res);
});



const listFeedback = catchAsyncError(async function (req, res) {
    const { user_id } = req.body;
    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 20;
    const feedback = await Feedback.find({}).skip((page - 1) * limit).limit(limit).lean()
    
    tsend(feedback, '', res)
});


module.exports = {
    createFeedback,
    listFeedback
}