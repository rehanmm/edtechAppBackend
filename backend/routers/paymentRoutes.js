const express =require('express');
const router = express.Router();
const { checkout,paymentLessonVerification,paymentEventVerification,dopayment,getKey} =require('../controllers/paymentCtrl') 



router.route("/payment/checkout").
get(checkout);
router.route("/payment/paymentverification")
.post(paymentLessonVerification);
// router.route("/payment/event/paymentverification")
// .post(paymentEventVerification);


module.exports=router;