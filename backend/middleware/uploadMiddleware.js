

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
        console.log(req.file);
   
    next()
}


module.exports=upload


