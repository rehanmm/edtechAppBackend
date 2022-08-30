const  express  = require('express');
const notificationCtrl =require( '../controllers/notificationCtrl')
const router=express.Router()

router.route('/admin/notification/list')
.get(notificationCtrl.list)
router.route('/admin/notification/create')
.post(notificationCtrl.create)
router.route('/admin/notification/read')
.get(notificationCtrl.read)
router.route('/admin/notification/update')
.put(notificationCtrl.update)
router.route('/admin/notification/remove')
.delete(notificationCtrl.remove)

module.exports= router


// router.route('/enrollment/enrolled')
//  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)
