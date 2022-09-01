const  express  = require('express');
const blockedUserCtrl =require( '../controllers/blockUserCtrl')
const router=express.Router()
const {authenticateToken,hasAuthorisation} = require( '../middleware/adminAuthMiddleware')

router.route('/admin/user/blocked/list')
.post(authenticateToken,hasAuthorisation,blockedUserCtrl.list)
router.route('/admin/user/block')
.post(authenticateToken,hasAuthorisation,blockedUserCtrl.create)
router.route('/admin/user/unblock')
.delete(authenticateToken,hasAuthorisation,blockedUserCtrl.remove)

module.exports= router


// router.route('/enrollment/enrolled')
//  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)
