const {instance } = require('../config/paymentConfig');
const razorpay = require("razorpay");
const crypto = require("crypto");
const Payment  = require("../models/paymentModel");


const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};

dopayment = async (req, res) => {
   const  options = {
        "key_id": process.env.RAZORPAY_API_KEY, // Enter the Key ID generated from the Dashboard
        "amount": "100", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Acme Corp",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": "order_KHOz6bU9vzmuXU", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
        },
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9999999999"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };

    var rzp1 = new razorpay(options);
// rzp1.on('payment.failed', function (response){
//         alert(response.error.code);
//         alert(response.error.description);
//         alert(response.error.source);
//         alert(response.error.step);
//         alert(response.error.reason);
//         alert(response.error.metadata.order_id);
//         alert(response.error.metadata.payment_id);
// });

console.log(rzp1)
res.json({status: 'success',
});
}


 const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

   const payment= await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
req.payment=payment
    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};


const getKey = async (req, res) => {


res.json({key:process.env.RAZORPAY_API_KEY})

 }

module.exports={checkout,paymentVerification,dopayment,getKey}