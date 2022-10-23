const  express  = require('express')
const awsCtrl =require( '../controllers/awsCtrl')
const router=express.Router()
const { authenticateToken, hasAuthorisation } = require('../middleware/adminAuthMiddleware')
const {isModerator,isCourseManager,isAdmin,isAdminOrCourseManager,isAdminOrCourseManagerOrModerator}=require('../middleware/rolesAuthorization')

// router.route('/admin/aws/list')
// .post(authenticateToken,hasAuthorisation,awsCtrl.list)
// router.route('/admin/aws/create')
// .post(authenticateToken,hasAuthorisation,awsCtrl.create)
router.route('/admin/aws/read')
.post(authenticateToken,hasAuthorisation,isAdmin,awsCtrl.read)
router.route('/admin/aws/update')
.put(authenticateToken,hasAuthorisation,isAdmin,awsCtrl.update)
// router.route('/admin/aws/remove')
// .delete(authenticateToken,hasAuthorisation,awsCtrl.remove)

module.exports= router


// router.route('/enrollment/enrolled')
//  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)
