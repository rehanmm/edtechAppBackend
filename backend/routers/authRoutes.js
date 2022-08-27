const  express  = require('express');
const authCtrl =require( '../controllers/authCtrl')
const {authenticateToken,hasAuthorisation,verifyAdmin} = require( '../middleware/adminAuthMiddleware')
const router=express.Router()




router.route('/admin/login')
.post(authCtrl.signin)

// router.route('/auth/anonymous')
// .post(authCtrl.anonymous)

router.route('/admin/new-admin')
.post(authenticateToken,hasAuthorisation,verifyAdmin,authCtrl.createNewAdmin)
router.route('/admin/signout')
.get(authCtrl.signout)


module.exports=router