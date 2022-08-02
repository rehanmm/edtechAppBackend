const  express  = require('express');
const courseCtrl =require('../controllers/courseCtrl')
const router=express.Router()


// :courseId/lesson/new'    
router.route('/courses')
.get(courseCtrl.list)
.post(courseCtrl.create)
// router.route('/courses/by/:instructorId')
// .get(courseCtrl.courseByInstructor)
// router.route('/courses/published')
// .get(courseCtrl.coursePublished)


// router.route('/courses/by/:instructorId')



router.route('/courses/:courseId')
.get(courseCtrl.read)
.put(courseCtrl.update)
.delete(courseCtrl.remove)

router.param('courseId',courseCtrl.courseById)

module.exports= router