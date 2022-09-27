const UploadFile=require('../models/uploadsModel')
const {s3Uploadv2forum}=require('../utils/s3services')
const { tsend,send } = require('../middleware/responseSender');
const catchAsyncError=require('../error/catchAsyncError');
const forumfileupload=catchAsyncError( async function (req, res) {

    const {user_id,content_type,ext}=req.body
    const result = await s3Uploadv2forum(req.file);
    const {Bucket,Location,Key}=result

delete req.file
   const uploadfile= new  UploadFile({
    user_id,
    content_type,
    extension:ext,
    payload:{
        bucket:Bucket,
        key:Key,
        location:Location

    }

   })

   await uploadfile.save();

    

    tsend({link:result.Location},"profile picture updated successfully",res)
})


module.exports= {forumfileupload}