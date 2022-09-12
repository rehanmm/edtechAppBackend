const  express  = require('express');
const {uploadAssignmet,listOfAssignment,submitAssignment} =require( '../controllers/assignmentCtrl')
const router=express.Router()
const {authenticateToken,hasAuthorisation} = require( '../middleware/adminAuthMiddleware')
const upload=require('../middleware/uploadMiddleware')

router.route('/assignment/upload')
.post(upload,uploadAssignmet,submitAssignment)
router.route('/list')
.post(listOfAssignment)
// router.route('/admin/assignment/review')
// .put(authenticateToken,hasAuthorisation,reviewAssignment)
// router.route('/admin/assignment/byUser')
// .post(authenticateToken,hasAuthorisation,byUserAssignment)


module.exports= router

