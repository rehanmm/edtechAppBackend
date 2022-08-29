const  express  = require('express')
awsCtrl =require( '../controllers/awsCtrl')
const router=express.Router()

router.route('/aws/list')
.get(awsCtrl.list)
router.route('/aws/create')
.post(awsCtrl.create)
router.route('/aws/read')
.get(awsCtrl.read)
router.route('/aws/update')
.put(awsCtrl.update)
router.route('/aws/remove')
.delete(awsCtrl.remove)

module.exports= router


// router.route('/enrollment/enrolled')
//  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)
