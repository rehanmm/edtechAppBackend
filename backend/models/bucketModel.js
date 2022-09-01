const mongoose=require('mongoose');

const bucketSchema = new mongoose.Schema({
   aws_stream_bucket:String,
    aws_upload_bucket:String,
});

module.exports=mongoose.model('Bucket',bucketSchema);