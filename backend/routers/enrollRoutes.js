const  express  = require('express');
const enrollCtrl =require( '../controllers/enrollCtrl')
const router=express.Router()

router.route('/enrollment')
.get(enrollCtrl.list)
.post(enrollCtrl.create)
// router.route('/enrolls/by/:instructorId')
// .get(enrollCtrl.enrollByInstructor)
// router.route('/enrolls/published')
// .get(courseCtrl.enrollsPublished)
router.route('/enrollment/:enrollId')
.get(enrollCtrl.read)
.put(enrollCtrl.update)
.delete(enrollCtrl.remove)

router.param('enrollmentId',enrollCtrl.enrollById)

module.exports= router


// router.route('/enrollment/enrolled')
//  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)
