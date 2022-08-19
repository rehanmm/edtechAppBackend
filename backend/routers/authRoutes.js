const  express  = require('express');
const authCtrl =require( '../controllers/authCtrl')
const userCtrl =require( '../controllers/userCtrl')
const router=express.Router()




router.route('/admin/login')
.post(authCtrl.signin)

// router.route('/auth/anonymous')
// .post(authCtrl.anonymous)

router.route('/admin/signup')
.post(authCtrl.signup)
router.route('/admin/signout')
.get(authCtrl.signout)


module.exports=router