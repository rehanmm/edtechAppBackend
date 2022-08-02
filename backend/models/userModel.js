const mongoose = require('mongoose');   
const crypto = require('crypto');




const userSchema = new mongoose.Schema({
    
    name:{
        type:String,
           trim:true,
        required:['Name is required']
    },
    password:{
        type:String ,
        required:['Password is required']
    }
    ,
    email:{
        type:String,
        trim:true,
        unique:['Email already exist'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        required:[true,'Email is required']
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
phone_number:{
    type:Number,

}

    
    
}
);



// ---------------------------------------------------------------------------


// checking validity of the password
userSchema.methods.isValidPassword= function(password) { 
                const hash = crypto.pbkdf2Sync(password,  
            this.salt, 1000, 64, `sha512`).toString(`hex`); 
            return this.password === hash; 
        }; 
    
    
    
   
     
     
   userSchema.pre('save',async function(){

        this.salt=crypto.randomBytes(16).toString('hex')

        this.password=crypto.pbkdf2Sync(this.password, this.salt,  
            1000, 64, `sha512`).toString(`hex`); 

    })
    module.exports= mongoose.model('User',userSchema);
    
    
    
    
    
    
