const  express  = require('express');
const lessonCtrl =require( '../controllers/lessonCtrl')
const assignmentCtrl =require( '../controllers/assignmentCtrl')
const router=express.Router()
const {authenticateToken,hasAuthorisation} = require( '../middleware/adminAuthMiddleware')
const blockUserMiddleware = require('../middleware/blockedUserMiddleware')
const {isModerator,isCourseManager,isAdmin,isAdminOrCourseManager,isAdminOrCourseManagerOrModerator}=require('../middleware/rolesAuthorization')

router.route('/admin/lessons')
.post(authenticateToken,hasAuthorisation,isAdminOrCourseManagerOrModerator,lessonCtrl.list)
router.route('/admin/lesson/create')
.post(authenticateToken,hasAuthorisation,lessonCtrl.create)
router.route('/admin/getLesson')
.post(authenticateToken,hasAuthorisation,lessonCtrl.getLesson)
router.route('/ui/lesson')
.post(blockUserMiddleware,lessonCtrl.read)
router.route('/ui/lesson/completed')
.post(blockUserMiddleware,lessonCtrl.completedLesson)
router.route('/ui/lesson/start')
.post(blockUserMiddleware,lessonCtrl.startLesson)
router.route('/ui/lesson/payment')
.post(blockUserMiddleware,lessonCtrl.paymentForLesson)

router.route('/ui/lesson/assignment/submit')
.post(assignmentCtrl.submitAssignment)

// router.route('/lessons/:lessonId')


// router.use(authenticateToken,hasAuthorisation)
router.route('/admin/lesson/remove')
.delete(authenticateToken,hasAuthorisation,isAdminOrCourseManager,lessonCtrl.remove)
router.route('/admin/lesson/update')
.put(authenticateToken,hasAuthorisation,isAdminOrCourseManager,lessonCtrl.update)

router.route('/admin/lesson/update/position')
.put(authenticateToken,hasAuthorisation,isAdminOrCourseManager,lessonCtrl.updateLessonPosition)


module.exports= router