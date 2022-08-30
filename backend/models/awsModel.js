const mongoose=require('mongoose');

const awsSchema = new mongoose.Schema({
  accessKeyId:String,
    secretAccessKey:String
},
{
    timestamps:{createdAt:'created_at',updatedAt:'updated_at'}
});

module.exports=mongoose.model('Aws',awsSchema);