const  express  = require('express');
const lessonCtrl =require( '../controllers/lessonCtrl')
const router=express.Router()
const {authenticateToken,hasAuthorisation} = require( '../middleware/adminAuthMiddleware')

router.route('/admin/lessons')
.post(lessonCtrl.list)
router.route('/admin/lesson/create')
.post(lessonCtrl.create)
// router.route('/lessons/by/:instructorId')
// .get(lessonCtrl.lessonByInstructor)
// router.route('/lessons/published')
// .get(courseCtrl.lessonsPublished)
router.route('/ui/lesson')
.post(lessonCtrl.read)
router.route('/ui/lesson/completed')
.post(lessonCtrl.completedLesson)
router.route('/ui/lesson/assignment/submit')
.post(lessonCtrl.submitAssignment)
// router.route('/lessons/:lessonId')
router.use(authenticateToken,hasAuthorisation)
router.route('/admin/lesson/remove')
.delete(lessonCtrl.remove)
router.route('/admin/lesson/update')
.put(lessonCtrl.update)



module.exports= router