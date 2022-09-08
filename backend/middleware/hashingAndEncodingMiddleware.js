const crypto = require('crypto');
const errorHandler = require('../utils/errorHandler');
const config=require('../config/config');

const secret = config.SECRET_KEY;
const base64Decoder= function(req,res,next){
    
    // var a = Buffer.from('baseAuth').toString('base64')
    // console.log(a);
    var b = Buffer.from(req.body.data,'base64').toString()
b=JSON.parse(b);
req.body=b;
next()
    // console.log(b);
}


const md5HashVerifier=function(req,res,next){
const {hash,random_string,input,timestamp}=req.body;
const inputString =JSON.stringify(input);

const combinedString=random_string+inputString+timestamp+config.SECRET_KEY;

let myhash = crypto.createHash('md5').update(combinedString).digest('hex')  

         if(hash===myhash){
req.body=input;
return next();
         }       
         
         else{
return next(new errorHandler('Access denied',401))

         }
    

}

module.exports={base64Decoder,md5HashVerifier}
