const  express  = require('express');
const unitCtrl =require('../controllers/unitCtrl')
const router=express.Router()


// :courseId/lesson/new'    
router.route('/course/units')
.get(unitCtrl.list)
router.route('/admin/unit/create')
.post(unitCtrl.create)
// router.route('/courses/by/:instructorId')
// .get(courseCtrl.courseByInstructor)
// router.route('/courses/published')
// .get(courseCtrl.coursePublished)


// router.route('/courses/by/:instructorId')



router.route('/units/:unitId')
.get(unitCtrl.read)
.put(unitCtrl.update)
.delete(unitCtrl.remove)

router.param('unitId',unitCtrl.unitById)

module.exports= router