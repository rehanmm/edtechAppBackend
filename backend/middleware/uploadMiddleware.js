const uuid = require("uuid").v4;

const upload=(req,res,next)=>{
const {file,user_id,lesson_id}=req.body;

var b64string = file;
var buffer = Buffer.from(b64string, 'base64');
        req.file={
            fieldname: 'file',
  originalname: `${user_id}-${lesson_id}.pdf`,
  encoding: '7bit',
  mimetype: 'application/pdf',
  buffer
};   
    next()
}

const uploadprofile=(req,res,next)=>{
const {file,user_id,ext}=req.body;

var b64string = file;
var buffer = Buffer.from(b64string, 'base64');
        req.file={
            fieldname: 'file',
  originalname: `${user_id}.${ext}`,
  encoding: '7bit',
  mimetype: `image/${ext}`,
  buffer
};  

        console.log(req.file);
   
    next()
}

const uploadforumMiddleware=(req,res,next)=>{
const {file,user_id,ext}=req.body;

var b64string = file;
var buffer = Buffer.from(b64string, 'base64');
        req.file={
            fieldname: 'file',
  originalname: `${user_id}-${uuid()}.${ext}`,
  encoding: '7bit',
  mimetype: `image/${ext}`,
  buffer
};  


   
    next()
}




module.exports={upload,uploadprofile,uploadforumMiddleware}


