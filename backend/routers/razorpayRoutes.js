const  express  = require('express')
const razorpayCtrl =require( '../controllers/razorpayCtrl')
const router=express.Router()
const { authenticateToken, hasAuthorisation } = require('../middleware/adminAuthMiddleware')
const {isModerator,isCourseManager,isAdmin,isAdminOrCourseManager,isAdminOrCourseManagerOrModerator}=require('../middleware/rolesAuthorization')


router.route('/admin/razorpay/read')
.post(authenticateToken,hasAuthorisation,isAdmin,razorpayCtrl.read)
router.route('/admin/razorpay/update')
.put(authenticateToken,hasAuthorisation,isAdmin,razorpayCtrl.update)


module.exports= router

