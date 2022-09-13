const express =require('express');
const router = express.Router();
const { checkout,paymentVerification,dopayment,getKey} =require('../controllers/paymentCtrl') 



router.route("/payment/checkout").
get(checkout);
router.route("/payment/paymentverification")
.post(paymentVerification);
router.route("/payment/get-key")
.post(getKey);

module.exports=router;