const razorpay = require('razorpay');

const instance = new razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
  });
 
  module.exports={instance};