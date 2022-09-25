const {instance } = require('../config/paymentConfig');
const razorpay = require("razorpay");
const crypto = require("crypto");
const Payment  = require("../models/paymentModel");
const Event  = require("../models/eventModel");
const catchAsyncError=require('../error/catchAsyncError');
const Progress = require('../models/progressModel');


const checkout = catchAsyncError(async (req, res) => {
/*
lesson_id
unit_id,
user_id,
amount,

or
event_id
*/
req.query.payment_type='lesson'
if(req.query.event_id){
  req.query.payment_type='event'
}
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
  payment.order_id=order.id
  await payment.save()
  res.status(200).json({
    success: true,
    data:{
      api_key:process.env.RAZORPAY_API_KEY,
      order
    },
  });
});




 const paymentLessonVerification = catchAsyncError(async (req, res) => {
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
    const {event_id,payment_type,lesson_id,user_id} = await Payment.findOne({ order_id: order_id });
    
    //    agar lesson hai toh
    if(payment_type=='lesson'){
      
      
      await Payment.findOneAndUpdate({order_id},{
        razorpay_order_id,
        razorpay_payment_id,
    razorpay_signature,
    status:'success'
  });
  
  const payment=  await Payment.findOne({order_id}).lean()
  console.log(payment);
  res.status(200).json({
    success: true,
    message: "Payment verified",
    data:payment
  })
const obj={}
obj[lesson_id]=Date.now()
  await Progress.findOneAndUpdate({user_id,lesson_id},{
    $push:{
      completed_lessons:obj
    }
  })
  
  
  
  
}
//agar event hai toh
else if(payment_type=='event'){
  // console.log(event_id,payment_type)
  const event = await Event.findById(event_id).lean();
  console.log(event)
  await Payment.findOneAndUpdate({order_id},{
    razorpay_order_id,
    razorpay_payment_id,
    event_id,
    razorpay_signature,
    status:'success'
  });

event.razorpay_order_id=razorpay_order_id
  const payment=  await Payment.findOne({order_id}).lean()
  console.log(payment);
  res.status(200).json({
    success: true,
    message: "Payment verified",
   data:event
   
  })

  const obj={}
  obj[lesson_id]=Date.now()
    await Progress.findOneAndUpdate({user_id,lesson_id},{
      $push:{
        completed_lessons:obj
      }
    })


}










  } else {
    const payment= await Payment.findOneAndUpdate({order_id},{
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      status:'payment is Invalid'
    });

    return res.status(400).json({
      success: false,
      message: "Payment failed",
    });
  }
});

 const paymentEventVerification = catchAsyncError(async (req, res) => {
  const {order_id,razorpay_order_id, razorpay_payment_id,event_id,razorpay_signature } =
    req.body;

    

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here
  } else {
    const payment= await Payment.findOneAndUpdate({order_id},{
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      status:'payment is Invalid'
    });

    res.status(400).json({
      success: false,
      message: "Payment failed",
    });
  }
});





 

module.exports={checkout,paymentLessonVerification,paymentEventVerification}