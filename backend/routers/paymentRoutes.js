const express =require('express');
const router = express.Router();
const { checkout,paymentVerification,dopayment,getKey} =require('../controllers/paymentCtrl') 



router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);
router.route("/payment").post(dopayment);
router.route("/key").post(getKey);

module.exports=router;