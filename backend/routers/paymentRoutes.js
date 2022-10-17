const express =require('express');
const router = express.Router();
const {paymentHistory, checkout,paymentLessonVerification,paymentEventVerification,dopayment,bundleBuy,getKey} =require('../controllers/paymentCtrl') 



router.route("/payment/checkout").
get(checkout);
router.route("/payment/paymentverification")
.post(paymentLessonVerification);
router.route("/payment/history")
.post(paymentHistory);
router.route("/payment/bundleBuy")
.post(bundleBuy);


module.exports=router;