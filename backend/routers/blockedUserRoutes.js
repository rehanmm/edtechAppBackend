const  express  = require('express');
const blockedUserCtrl =require( '../controllers/blockUserCtrl')
const router=express.Router()

router.route('/admin/user/blocked/list')
.post(blockedUserCtrl.list)
router.route('/admin/user/block')
.post(blockedUserCtrl.create)
router.route('/admin/user/unblock')
.delete(blockedUserCtrl.remove)

module.exports= router


// router.route('/enrollment/enrolled')
//  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)
