const  express  = require('express');
const courseCtrl =require('../controllers/courseCtrl')
const {authenticateToken,hasAuthorisation} = require( '../middleware/adminAuthMiddleware')
// const progressCtrl =require('../../test/progressCtrl')
const router=express.Router()


// :courseId/lesson/new'    
// router.route('/courses')
// .get(courseCtrl.list)


// router.route('/progress/create')
// .post(progressCtrl.create)


// .get(courseCtrl.courseByInstructor)
// router.route('/courses/published')
// .get(courseCtrl.coursePublished)


// router.route('/courses/by/:instructorId')


router.use(authenticateToken,hasAuthorisation)
router.route('/admin/course')
.post(courseCtrl.read)
router.route('/admin/updateCourse')
.put(courseCtrl.update)
// .delete(courseCtrl.remove)

// router.param('courseId',courseCtrl.courseById)

module.exports= router