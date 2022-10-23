const  express  = require('express');
const additionallessonCtrl =require( '../controllers/additionalLessonCtrl')
const assignmentCtrl =require( '../controllers/assignmentCtrl')
const router=express.Router()
const {authenticateToken,hasAuthorisation} = require( '../middleware/adminAuthMiddleware')
const blockUserMiddleware = require('../middleware/blockedUserMiddleware')
const {isModerator,isCourseManager,isAdmin,isAdminOrCourseManager,isAdminOrCourseManagerOrModerator}=require('../middleware/rolesAuthorization')


// router.route('/admin/lessons')
// .post(authenticateToken,hasAuthorisation,additionallessonCtrl.list)
router.route('/admin/lesson/additionals/create')
.post(authenticateToken,hasAuthorisation,isAdminOrCourseManager,additionallessonCtrl.create)
router.route('/ui/additional')
.post(blockUserMiddleware,additionallessonCtrl.read)
// router.route('/ui/lesson/completed')
// .post(blockUserMiddleware,additionallessonCtrl.completedLesson)
// router.route('/ui/lesson/start')
// .post(blockUserMiddleware,additionallessonCtrl.startLesson)
// router.route('/ui/lesson/payment')
// .post(blockUserMiddleware,additionallessonCtrl.paymentForLesson)

// router.route('/ui/lesson/assignment/submit')
// .post(assignmentCtrl.submitAssignment)

// router.route('/lessons/:lessonId')


// router.use(authenticateToken,hasAuthorisation)
router.route('/admin/lesson/additionals/remove')
.delete(authenticateToken,hasAuthorisation,isAdminOrCourseManager,additionallessonCtrl.remove)
// router.route('/admin/lesson/update')
// .put(authenticateToken,hasAuthorisation,lessonCtrl.update)

// router.route('/admin/lesson/update/position')
// .put(authenticateToken,hasAuthorisation,lessonCtrl.updateLessonPosition)


module.exports= router