const mongoose=require('mongoose');
const crypto=require('crypto');

const adminSchema=mongoose.Schema({ 
    email:{
        type:String,
        required:true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        unique:[true,'email already exists']
    },  
    password:{
        type:String,
        trim: true
    },
    salt:{
        type:String,
        trim:true
    },
    role:{
        type:String,
        default:'admin',
        enum:['admin','superadmin']
},
total_blocked_user:Number

},{timestamps:{createdAt:'created_at',updatedAt:'updated_at'}});




// checking validity of the password
adminSchema.methods.isValidPassword= function(password) { 
    const hash = crypto.pbkdf2Sync(password,  
this.salt, 1000, 64, `sha512`).toString(`hex`);
return this.password === hash; 
}; 

adminSchema.methods.savePassword=async function(password) {
this.salt=crypto.randomBytes(16).toString('hex')
this.password=crypto.pbkdf2Sync(this.password, this.salt,1000, 64, `sha512`).toString(`hex`); 
}



const Admin=mongoose.model('Admin',adminSchema);
module.exports=Admin;



