const  express  = require('express');
const firebaseAuthCtrl =require( '../controllers/fireBaseAuthCtrl')
const router=express.Router()

router.route('/auth/login')
.post(firebaseAuthCtrl.login)
router.route('/user/update/name')
.post(firebaseAuthCtrl.update)

module.exports=router;