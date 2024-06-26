const {instance } = require('../config/paymentConfig');
const razorpay = require("razorpay");
const crypto = require("crypto");
const Payment  = require("../models/paymentModel");
const Event  = require("../models/eventModel");
const catchAsyncError=require('../error/catchAsyncError');
const Progress = require('../models/progressModel');
const {tsend,send} = require('../middleware/responseSender');



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
    const {event_id,payment_type,lesson_id,user_id,unit_id} = await Payment.findOne({ order_id: order_id });
    
    //    agar lesson hai toh
    if(payment_type=='lesson'){
      
      
      await Payment.findOneAndUpdate({order_id},{
        razorpay_order_id,
        razorpay_payment_id,
    razorpay_signature,
    status:'success'
  });
  const obj={}
obj[lesson_id]=Date.now()
console.log(obj)
  await Progress.findOneAndUpdate({user_id,unit_id},{
    $addToSet:{
      completed_lessons:obj
    }
  })
  const pro=await Progress.findOne({user_id,unit_id})
  console.log(pro);
  const payment=  await Payment.findOne({order_id}).lean()
  // console.log(payment);
  res.status(200).json({
    success: true,
    message: "Payment verified",
    data:payment
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


const paymentHistory = catchAsyncError(async (req, res) => {
  const { user_id, payment_type } = req.body;
  if (!user_id) {
    return res.status(400).json({
      success: false,
      message: "User id is required",
    });

  }
  const where = { user_id };
  if (payment_type) {
    where.payment_type = payment_type;
  }
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const payHistory = await Payment.find(where).sort({ created_at: -1 }).skip((page - 1) * limit).limit(limit).lean()
  tsend({
    page,
    limit,
    payHistory,
    
  }, '', res)

 })





const bundleBuy = catchAsyncError(async (req, res) => { 
  

})




const paymentHistoryAdmin = catchAsyncError(async (req, res) => {
  const { user_id, payment_type } = req.body;
  const where = {};
  if (user_id) {
    where.user_id = user_id ;
  }
  if (payment_type) {
    where.payment_type = payment_type;
  }
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const payHistory = await Payment.find(where).sort({ created_at: -1 }).skip((page - 1) * limit).limit(limit).lean()

  const previousDate = Date.now() - 1 * 24 * 60 * 60 * 1000;


  const payHistoryDay = await Payment.find({
    created_at: {
      $gte: previousDate
    }
  }).sort({ created_at: -1 }).lean();
  tsend({
    page,
    limit,
    payHistory,
    payHistoryDay
    
  }, '', res)

 })

const paymentHistoryAdminToDay = catchAsyncError(async (req, res) => {
  const { user_id, payment_type } = req.body;

  if (!user_id) {
    return res.status(400).json({
      success: false,
      message: "User id is required",
    });

  }

  const previousDate = Date.now() - 1 * 24 * 60 * 60 * 1000;


  const payHistoryDay = await Payment.find({
    created_at: {
      $gte: previousDate
    }
  }).sort({ created_at: -1 }).lean();

  const where = { user_id };
  if (payment_type) {
    where.payment_type = payment_type;
  }
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const payHistory = await Payment.find(where).sort({ created_at: -1 }).skip((page - 1) * limit).limit(limit).lean()
  tsend({
    page,
    limit,
    payHistory,
    
  }, '', res)

 })



 

module.exports={checkout,paymentLessonVerification,paymentEventVerification,paymentHistory,bundleBuy,paymentHistoryAdmin}