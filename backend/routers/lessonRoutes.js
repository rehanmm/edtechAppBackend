const  express  = require('express');
const lessonCtrl =require( '../controllers/lessonCtrl')
const router=express.Router()

router.route('/lessons')
.get(lessonCtrl.list)
.post(lessonCtrl.create)
// router.route('/lessons/by/:instructorId')
// .get(lessonCtrl.lessonByInstructor)
// router.route('/lessons/published')
// .get(courseCtrl.lessonsPublished)
router.route('/lessons/:lessonId')
.get(lessonCtrl.read)
.put(lessonCtrl.update)
.delete(lessonCtrl.remove)

router.param('lessonId',lessonCtrl.lessonById)

module.exports= router