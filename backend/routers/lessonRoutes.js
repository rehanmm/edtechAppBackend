const  express  = require('express');
const lessonCtrl =require( '../controllers/lessonCtrl')
const router=express.Router()

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
// router.route('/lessons/:lessonId')
router.route('/lessons/:lessonId')
.put(lessonCtrl.update)
.delete(lessonCtrl.remove)



module.exports= router