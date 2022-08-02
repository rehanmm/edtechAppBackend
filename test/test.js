const crypto=require('crypto')
const hashPassword = function(password){
    console.log(this)
        //generating salt
        this.salt = crypto.randomBytes(16).toString('hex')
    //hashing password
        this.password = crypto.pbkdf2Sync(password, this.salt,  
            1000, 64, `sha512`).toString(`hex`); 
    };
    
    hashPassword('rehan');