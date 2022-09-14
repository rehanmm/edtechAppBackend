const {instance } = require('../config/paymentConfig');
const razorpay = require("razorpay");
const crypto = require("crypto");
const Payment  = require("../models/paymentModel");


const checkout = async (req, res) => {
  console.log(req.query)
  const options = {
    amount: Number(req.query.amount * 100),
    currency: "INR",
  };

  const payment= new Payment({...options,...req.query})

  const {_id}=payment
  payment.receipt=`receipt_order_${_id}`
  options.receipt=`receipt_order_${_id}`
  payment.status='pending'
  
  
  const order = await instance.orders.create(options);
  payment.created_at=order.created_at
  await payment.save()
console.log(order)
  res.status(200).json({
    success: true,
    data:{
      api_key:process.env.RAZORPAY_API_KEY,
      order
    },
  });
};




 const paymentVerification = async (req, res) => {
  const {order_id,razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

    

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

   const payment= await Payment.findByIdAndUpdate(order_id,{
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      status:'success'
    });
    res.status(200).json({
      success: true,
      message: "Payment verified",
     data:payment
    })
  } else {
    const payment= await Payment.findByIdAndUpdate(order_id,{
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      status:'failed'
    });

    res.status(400).json({
      success: false,
      message: "Payment failed",
    });
  }
};


const getKey = async (req, res) => {

res.json({
  success: true,
  key:process.env.RAZORPAY_API_KEY})

 }



 

module.exports={checkout,paymentVerification,getKey}