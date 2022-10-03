const  express  = require('express');
const {uploadAssignmet, userAssignment,listOfAssignment,submitAssignment,reviewAssignment,reviewEditAssignment,getAssignment} =require( '../controllers/assignmentCtrl')
const router=express.Router()
const {authenticateToken,hasAuthorisation} = require('../middleware/adminAuthMiddleware')
const {upload}=require('../middleware/uploadMiddleware')

router.route('/assignment/upload')
.post(upload,uploadAssignmet,submitAssignment)
router.route('/list')
.post(listOfAssignment)
router.route('/admin/assignment/review/list')
.post(authenticateToken,hasAuthorisation,reviewAssignment)
router.route('/assignment/user/list')
.post(userAssignment)
router.route('/admin/assignment/review/edit')
.put(authenticateToken,hasAuthorisation,reviewEditAssignment)
router.route('/ui/getAssignment')
.post(getAssignment)
// router.route('/admin/assignment/byUser')

// .post(authenticateToken,hasAuthorisation,byUserAssignment)


module.exports= router

