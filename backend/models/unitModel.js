const mongoose = require('mongoose');   
const {lessonSchema}=require('../models/lessonModel')
const Progress=require('../models/progressModel')

const unitSchema = new mongoose.Schema({
    unit_name: {
        type: String,
        required: 'unit name is required'
      },
      image_url:{
        type:String
      },
      // course_name:{
      //   type:String,
      //   trim: true,
      //   default:''
      //  },
       completion:{
        type:String,
        default:'auto'
      },
      tags:[{
        type:String,
        default:''
       }],
       course_id:{
        type:mongoose.Schema.Types.ObjectId,
       },
       description: {
        type: String,
        trim: true,
        default:''
       },
      //  image: {
      //   data: Buffer,
      //   contentType: String
      //  },
      //  instructor: {
      //   type: mongoose.Schema.ObjectId,
      //   ref: 'User'
      //  },

      is_paid:{
        type:Boolean,
        default:false
      },
      price:{
        type:Number,
        default:0
      },
      prerequisite:
      {
        has_prerequisite:{
          type:Boolean,
        default:false},
        type:{
          type:String,
          enum:['auto','manual'],
          default:'auto'
        },//manual or auto
        on:{
           type: mongoose.Schema.Types.ObjectId,
           ref:'Unit'
        },
        time:{
          type:Number,
        default:0},
        message:{
          type:String,
          default:""

        }
    },
    total_events:{
      type:Number,
      default:0
    },
    total_articles:{//TODO: change to total_articles
      type:Number,
      default:0
    },
    total_video:{//TODO: change to total_videos
      type:Number,
      default:0
    },
    total_test:{//TODO: change to total_test
      type:Number,
      default:0
    },

      lessons:[{
        _id:false,
        thumbnail_url:{
          type:String,
          trim:true,
        },
        index:Number,
        lesson_id:mongoose.Schema.Types.ObjectId,
        type:{
          type:String,
          trim:true,
          enum:['video','article','assignment','payment','test','event']
        },//video,article,assignment,payment/event
        prerequisite:
          {
            has_prerequisite:{
              type:Boolean,
            default:false},
            type:{
              type:String,
              default:'auto'
            },//manual or auto
            on:{
               type: mongoose.Schema.Types.ObjectId
            },
            time:{
              type:Number,
            default:0},
            message:{
              type:String,
              default:"please complete required unit first"

            }
        },

        title:{type:String,
          default:''},
        is_completed:{
          type:Boolean,
          default:false
        },
        description:{type:String,
          default:''}

  }],
  additionals: [{}],
  expiry: {
    type: Number,
  }
      
 
    
},{timestamps:{createdAt:'created_at',updatedAt:'updated_at'}});
const Unit=mongoose.model('unit',unitSchema);

unitSchema.set('toObject', { virtuals: true })
unitSchema.set('toJSON', { virtuals: true })
unitSchema.virtual('total_lesson').get(function(){
return this.lessons.length;
})
// unitSchema.virtual('total_articles').get(function(){
// // console.log(this.lessons.length)
// return this.lessons.length;
// })
module.exports={
    Unit,unitSchema
}

 unitSchema.methods.isUnitCompleted=async function(user_id){
    this.total_lessons=this.lessons.length;
    const unitProgress= await Progress.findOne({user_id,unit_id:this._id});
if(unitProgress.completed_lessons.length==this.lessons.length){

  await User.findOneAndUpdate({user_id},{
    $addToSet:{
      units_completed:this._id
    }
  })
};






 }
// unitSchema.pre('',async function(){

//   this.salt=crypto.randomBytes(16).toString('hex')

//   this.password=crypto.pbkdf2Sync(this.password, this.salt,  
//       1000, 64, `sha512`).toString(`hex`); 

// })

