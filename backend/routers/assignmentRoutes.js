const  express  = require('express');
const {uploadAssignmet,listOfAssignment,submitAssignment} =require( '../controllers/assignmentCtrl')
const router=express.Router()
const upload=require('../middleware/uploadFileMiddleware')

router.route('/upload')
.post(upload.single("file"),uploadAssignmet,submitAssignment)
router.route('/list')
.post(listOfAssignment)



module.exports= router


// router.route('/enrollment/enrolled')
//  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)
