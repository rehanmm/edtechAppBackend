const  express  = require('express');
const unitCtrl =require('../controllers/unitCtrl')
const router=express.Router()


// :courseId/lesson/new'    
router.route('/ui/unit')
.get(unitCtrl.read)
router.route('/admin/course/units')
.get(unitCtrl.list)
router.route('/admin/unit/create')
.post(unitCtrl.create)
// router.route('/courses/by/:instructorId')
// .get(courseCtrl.courseByInstructor)
// router.route('/courses/published')
// .get(courseCtrl.coursePublished)


// router.route('/courses/by/:instructorId')



router.route('/admin/unit')
.get(unitCtrl.read)
router.route('/admin/units/updateUnit')
.put(unitCtrl.update)
router.route('/admin/units/removeUnit')
.delete(unitCtrl.remove)



module.exports= router