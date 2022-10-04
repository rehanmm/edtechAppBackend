const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "user",
      // required:['Name is required']
    },
    user_id: {
      type: String,
      trim: true,
      unique: [true, "user id is already taken"],
      index: true,
    },
    display_picture: {
      type: String,
    },
    bucket: {
      type: String,
    },
    phone_number: {
      type: Number,
      require: [
        function (value) {
          if (this.is_anonymous) {
            return false;
          } else {
            return true;
          }
        },
        "please Enter your phone number",
      ],
    },
    // email:{
    //     type:String,
    //     trim:true,
    //     dropDups: true,
    //     match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    //     required:[function(value){
    //         if(this.is_anonymous||this.phone_number){
    //         return false
    //     }else {return true}},'Email is required']
    // },

    analysis: [String],
    upcommingeventsubbed: [
      {
        _id: false,
        user_id: String,
        event_id: mongoose.Schema.Types.ObjectId,
        is_paid: Boolean,
        price: Number,
        lesson_id: mongoose.Schema.Types.ObjectId,
        subscribed_at: Number,
        title: {
          type: String,
        },
        time: {
          date_full: String,
          date: Number,
          month: String,
          year: Number,
        },
        venue: {
          type: String,
        },
      },
    ],
    is_anonymous: {
      type: Boolean,
      default: false,
    },
    lessons_completed: {
      type: Number,
      default: 0,
    },
    video_watched: {
      type: Number,
      default: 0,
    },
    test_given: {
      type: Number,
      default: 0,
    },
    avg_percentage_test: {
      type: Number,
      default: 0,
    },
    last_lesson: {
      title: {
        type: String,
        default: "User has not seen any lesson",
      },
      lesson_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
        default: undefined,
      },
    },
    last_unit: {
      title: {
        type: String,
        trim: true,
        default: "",
      },
      unit_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Unit",
      },
    },
    total_answer_given: Number,
    total_question_asked: Number,
    last_lesson_progress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Progress",
    },
    units_completed: [{}],
    units_progress: [
      {
        _id: false,
        unit_id: mongoose.Schema.Types.ObjectId,
        lessons_completed: Number,
        //unit_id:'number of lesson completed'
      },
    ],

    personality: {
      title: String,
      head: String,
      body: String,
      head: String,
      traits: [String],
      weekness: [String],
      strenghts: [String],
      career_option: [String],
      scores: [
        {
          test_index: Number,
          test_id: String, 
          test_title: String,
          positive_score: String,
          positive_title: String,
          negative_score: String,
          negative_title: String,
        },
      ],
    },
  },

  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("User", userSchema);
