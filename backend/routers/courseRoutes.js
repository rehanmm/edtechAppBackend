const  express  = require('express');
const courseCtrl =require('../controllers/courseCtrl')
const { authenticateToken, hasAuthorisation } = require('../middleware/adminAuthMiddleware')
const {isModerator,isCourseManager,isAdmin,isAdminOrCourseManager,isAdminOrCourseManagerOrModerator}=require('../middleware/rolesAuthorization')
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


router.route('/admin/course')
.post(authenticateToken,hasAuthorisation,isAdminOrCourseManagerOrModerator,courseCtrl.read)

router.route('/admin/updateCourse')
.put(authenticateToken,hasAuthorisation,isAdminOrCourseManager,courseCtrl.update)


module.exports= router