const  express  = require('express');
const notificationCtrl = require('../controllers/notificationCtrl')
const { isModerator, isCourseManager, isAdmin, isAdminOrCourseManager, isAdminOrCourseManagerOrModerator } = require('../middleware/rolesAuthorization')
const { authenticateToken, hasAuthorisation } = require('../middleware/adminAuthMiddleware')
const router=express.Router()

router.route('/admin/notification/list')
.post(authenticateToken,hasAuthorisation,isAdminOrCourseManager,notificationCtrl.list)
router.route('/admin/notification/create')
.post(authenticateToken,hasAuthorisation,isAdminOrCourseManager,notificationCtrl.create)
router.route('/admin/notification/read')
.post(authenticateToken,hasAuthorisation,isAdminOrCourseManager,notificationCtrl.read)
router.route('/admin/notification/update')
.put(authenticateToken,hasAuthorisation,isAdminOrCourseManager,notificationCtrl.update)
router.route('/admin/notification/remove')
.delete(authenticateToken,hasAuthorisation,isAdminOrCourseManager,notificationCtrl.remove)

router.route('/admin/notification/all')
.post(authenticateToken,hasAuthorisation,isAdminOrCourseManager,notificationCtrl.list)
router.route('/admin/notification/single')
.post(notificationCtrl.create)
router.route('/admin/notification/multiple')
    .post(notificationCtrl.create)


    router.route('/ui/notification/list')
.post(notificationCtrl.list)
module.exports= router


// router.route('/enrollment/enrolled')
//  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)


