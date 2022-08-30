const  express  = require('express')
awsCtrl =require( '../controllers/awsCtrl')
const router=express.Router()
const {authenticateToken,hasAuthorisation} = require( '../middleware/adminAuthMiddleware')

router.route('/admin/aws/list')
.post(authenticateToken,hasAuthorisation,awsCtrl.list)
router.route('/admin/aws/create')
.post(authenticateToken,hasAuthorisation,awsCtrl.create)
router.route('/admin/aws/read')
.postauthenticateToken,hasAuthorisation,(awsCtrl.read)
router.route('/admin/aws/update')
.put(authenticateToken,hasAuthorisation,awsCtrl.update)
router.route('/admin/aws/remove')
.delete(authenticateToken,hasAuthorisation,awsCtrl.remove)

module.exports= router


// router.route('/enrollment/enrolled')
//  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)
