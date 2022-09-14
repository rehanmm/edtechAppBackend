const  express  = require('express');
const notificationCtrl =require( '../controllers/notificationCtrl')
const router=express.Router()

router.route('/admin/notification/list')
.post(notificationCtrl.list)
router.route('/admin/notification/create')
.post(notificationCtrl.create)
router.route('/admin/notification/read')
.post(notificationCtrl.read)
router.route('/admin/notification/update')
.put(notificationCtrl.update)
router.route('/admin/notification/remove')
.delete(notificationCtrl.remove)

router.route('/admin/notification/all')
.post(notificationCtrl.list)
router.route('/admin/notification/single')
.post(notificationCtrl.create)
router.route('/admin/notification/multiple')
.post(notificationCtrl.create)
module.exports= router


// router.route('/enrollment/enrolled')
//  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)


