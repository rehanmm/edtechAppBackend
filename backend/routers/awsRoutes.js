const  express  = require('express')
awsCtrl =require( '../controllers/awsCtrl')
const router=express.Router()

router.route('/admin/aws/list')
.get(awsCtrl.list)
router.route('/admin/aws/create')
.post(awsCtrl.create)
router.route('/admin/aws/read')
.get(awsCtrl.read)
router.route('/admin/aws/update')
.put(awsCtrl.update)
router.route('/admin/aws/remove')
.delete(awsCtrl.remove)

module.exports= router


// router.route('/enrollment/enrolled')
//  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)
