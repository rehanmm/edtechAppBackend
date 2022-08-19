const mongoose = require('mongoose');   
const crypto = require('crypto');




const userSchema = new mongoose.Schema({
    
    name:{
        type:String,
        trim:true,
        default:'user'
        // required:['Name is required']
    },
    user_id:{
        type:String
    },
    password:{
        type:String ,
        required:[function(value){
            if(this.is_anonymous||this.phone_number){
            return false
        }else {return true}},'Password is required']
    },
    phone_number:{
        type:Number,
        require:[true,'please Enter your phone number']
    }
    ,
    email:{
        type:String,
        unique:true,
        trim:true,
        dropDups: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required:[function(value){
            if(this.is_anonymous||this.phone_number){
            return false
        }else {return true}},'Email is required']
    },
    
    created:{
        type:Date,
        default:Date.now
    },
    updated:Date,
    salt:{
        type:String,
    },

 educator:{
    type:Boolean,
    default:false
},
analysis:[String]    ,
upcommingeventsubbed:[{
    event_id:mongoose.Schema.Types.ObjectId,
     name:{
        type:String
    },
    time:{
        type:Date
        
    },
    venue:{
        type:String
    }

}],
is_anonymous:{
    type:Boolean,
    default:false
},
lessons_completed:{
    type:Number,
default:0},
video_watched:{
    type:Number,
default:0},
test_given:{
    type:Number,
default:0},
avg_percentage_test:{
    type:Number,
default:0},
last_lesson:{
title:{
    type:String,
    default:'user has not seen any lesson'

},
    lesson_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Lesson'
}

},
last_unit:{
title:{
    type:String,
    default:'user has not seen any units'

},
    unit_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Unit'
}

},

last_lesson_progress:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Progress'
},
units_completed:[{}]


    
}
);



// ---------------------------------------------------------------------------


// checking validity of the password
userSchema.methods.isValidPassword= function(password) { 
                const hash = crypto.pbkdf2Sync(password,  
            this.salt, 1000, 64, `sha512`).toString(`hex`);
            return this.password === hash; 
        }; 
    
        userSchema.methods.savePassword=async function(password) {
            if(this.is_anonymous){return}

            this.salt=crypto.randomBytes(16).toString('hex')
    
            this.password=crypto.pbkdf2Sync(this.password, this.salt,  
                1000, 64, `sha512`).toString(`hex`); 
    
        }
     
     
//    userSchema.pre('save',async function(){
   
//     })
    module.exports= mongoose.model('User',userSchema);
    
    
    
    
    
    
