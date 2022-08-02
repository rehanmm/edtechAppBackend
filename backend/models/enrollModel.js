const mongoose = require('mongoose')

const enrollSchema = new mongoose.Schema({

    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },

    lessonStatus: [{
        lesson: { type: mongoose.Schema.ObjectId, ref: 'Lesson' },
        complete: Boolean
    }],
    enrolled: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    completed: Date
})

module.exports=mongoose.model('Enroll',enrollSchema);