const { Schema, model } = require("mongoose");

const marketingSchema = new Schema({
  title: {
    type: String,
  },
  message: {
    type: String,
  },
  tests: [
    {
      title: {
        type: String,
      },

      num_questions: Number,
      time_allowed: Number,
      positive: {
        abb: String,
        title: String,
      },
      negative: {
        abb: String,
        title: String,
      },

      message: String,

      questions: [
        {
          index: Number,
          body: String,
          question: {
            type: String,
          },
          image: String,

          video: String,
          options: [
            {
              index: Number,
                  body: String,
              weight: Number
            },
          ],
        },
      ],
    },
  ],
});


module.exports= model("Marketing", marketingSchema);