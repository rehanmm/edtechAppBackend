const  express  = require('express');
const blockedUserCtrl =require( '../controllers/blockUserCtrl')
const router=express.Router()
const {authenticateToken,hasAuthorisation} = require( '../middleware/adminAuthMiddleware')
const {isModerator,isCourseManager,isAdmin,isAdminOrCourseManager,isAdminOrCourseManagerOrModerator}=require('../middleware/rolesAuthorization')
router.route('/admin/user/blocked/list')
.post(authenticateToken,hasAuthorisation,isAdmin,blockedUserCtrl.list)
router.route('/admin/user/block')
.post(authenticateToken,hasAuthorisation,isAdmin,blockedUserCtrl.create)
router.route('/admin/user/unblock')
.delete(authenticateToken,hasAuthorisation,isAdmin,blockedUserCtrl.remove)

module.exports= router


// router.route('/enrollment/enrolled')
//  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)
