const mongoose=require('mongoose');
const crypto=require('crypto');

const adminSchema=mongoose.Schema({ 
    email:{
        type:String,
        required:true,
        unique:[true,'email already exists']
    },  
    password:{type:String},
    salt:{type:String},
    role:{
        type:String,
        default:'admin',
        enum:['admin','superadmin']
},

},{timestamps:{createdAt:'created_at',updatedAt:'updated_at'}});




// checking validity of the password
adminSchema.methods.isValidPassword= function(password) { 
    const hash = crypto.pbkdf2Sync(password,  
this.salt, 1000, 64, `sha512`).toString(`hex`);
return this.password === hash; 
}; 

adminSchema.methods.savePassword=async function(password) {
this.salt=crypto.randomBytes(16).toString('hex')
console.log(this.salt);
console.log(this.password)
this.password=crypto.pbkdf2Sync(this.password, this.salt,1000, 64, `sha512`).toString(`hex`); 
}



const Admin=mongoose.model('Admin',adminSchema);
module.exports=Admin;



