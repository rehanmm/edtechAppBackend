const express =require('express');
const router = express.Router();
const {paymentHistory, checkout,paymentLessonVerification,paymentEventVerification,dopayment,bundleBuy,getKey,paymentHistoryAdmin} =require('../controllers/paymentCtrl') 



router.route("/payment/checkout").
get(checkout);
router.route("/payment/paymentverification")
.post(paymentLessonVerification);
router.route("/payment/history")
.post(paymentHistory);
router.route("/payment/bundleBuy")
.post(bundleBuy);
router.route("/admin/payment/paymentHistory")
.post(paymentHistoryAdmin);


module.exports=router;