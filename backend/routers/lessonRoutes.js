const  express  = require('express');
const lessonCtrl =require( '../controllers/lessonCtrl')
const router=express.Router()
const {authenticateToken,hasAuthorisation} = require( '../middleware/adminAuthMiddleware')
const blockUserMiddleware =require('../middleware/blockedUserMiddleware')
router.route('/admin/lessons')
.post(authenticateToken,hasAuthorisation,lessonCtrl.list)
router.route('/admin/lesson/create')
.post(authenticateToken,hasAuthorisation,lessonCtrl.create)
router.route('/ui/lesson')
.post(blockUserMiddleware,lessonCtrl.read)
router.route('/ui/lesson/completed')
.post(blockUserMiddleware,lessonCtrl.completedLesson)

// router.route('/ui/lesson/assignment/submit')
// .post(lessonCtrl.submitAssignment)

// router.route('/lessons/:lessonId')


// router.use(authenticateToken,hasAuthorisation)
router.route('/admin/lesson/remove')
.delete(authenticateToken,hasAuthorisation,lessonCtrl.remove)
router.route('/admin/lesson/update')
.put(authenticateToken,hasAuthorisation,lessonCtrl.update)

router.route('/admin/lesson/update/position')
.put(authenticateToken,hasAuthorisation,lessonCtrl.updateLessonPosition)


module.exports= router