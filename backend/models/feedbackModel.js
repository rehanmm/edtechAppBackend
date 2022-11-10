const { Schema, model } = require('mongoose');

const FeedbackSchema = new Schema({
    user_id: {
        type: String,
        required: [true, 'User id is required']
    },
    timestamp: {
        type: Number
    },
    version_code: {
        type: String,
        required: [true, 'Version code is required']
    },
    feedback: {
        type: String,
        required: [true, 'Feedback is required']
        
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required']
    },
    created_at: {
        type: Number,
        default: Date.now

    }
});

module.exports = model('Feedback', FeedbackSchema);