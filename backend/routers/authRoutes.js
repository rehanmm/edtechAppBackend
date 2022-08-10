const  express  = require('express');
const authCtrl =require( '../controllers/authCtrl')
const userCtrl =require( '../controllers/userCtrl')
const router=express.Router()




router.route('/auth/signin')
.get(authCtrl.signin)

router.route('/auth/anonymous')
.post(authCtrl.anonymous)

router.route('/auth/signup')
.post(authCtrl.signup)
router.route('/auth/signout')
.get(authCtrl.signout)


module.exports=router