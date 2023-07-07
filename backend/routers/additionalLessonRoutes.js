const  express  = require('express');
const additionallessonCtrl =require( '../controllers/additionalLessonCtrl')
const assignmentCtrl =require( '../controllers/assignmentCtrl')
const router=express.Router()
const {authenticateToken,hasAuthorisation} = require( '../middleware/adminAuthMiddleware')
const blockUserMiddleware = require('../middleware/blockedUserMiddleware')
const {isModerator,isCourseManager,isAdmin,isAdminOrCourseManager,isAdminOrCourseManagerOrModerator}=require('../middleware/rolesAuthorization')


// router.route('/admin/additional/lessons')
// .post(authenticateToken,hasAuthorisation,additionallessonCtrl.list)
router.route('/admin/lesson/additionals/create')
.post(authenticateToken,hasAuthorisation,isAdminOrCourseManager,additionallessonCtrl.create)
router.route('/ui/additional')
.post(blockUserMiddleware,additionallessonCtrl.read)

router.route('/admin/lesson/additionals/remove')
.delete(authenticateToken,hasAuthorisation,isAdminOrCourseManager,additionallessonCtrl.remove)

module.exports= router