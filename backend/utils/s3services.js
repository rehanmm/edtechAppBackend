const { S3 } = require("aws-sdk");
// const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const uuid = require("uuid").v4;
const dotenv=require('dotenv')
dotenv.config()

// exports.s3Uploadv2 = async (files) => {
//   const s3 = new S3();

//   const params = files.map((file) => {
//     return {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: `uploads/${uuid()}-${file.originalname}`,
//       Body: file.buffer,
//     };
//   });

//   return await Promise.all(params.map((param) => s3.upload(param).promise()));
// };

exports.s3Uploadv2 = async (file) => {
    const s3 = new S3();
  console.log(file)
    const params =  {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `assignment/${uuid()}-${file.originalname}`,
        Body: file.buffer,
      };
  
    return await s3.upload(params).promise();
  };

  



// exports.s3Uploadv3 = async (files) => {
//   const s3client = new S3Client();

//   const params = files.map((file) => {
//     return {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: `uploads/${uuid()}-${file.originalname}`,
//       Body: file.buffer,
//     };
//   });

//   return await Promise.all(
//     params.map((param) => s3client.send(new PutObjectCommand(param)))
//   );
// };