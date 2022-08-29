const  express  = require('express');
const notificationCtrl =require( '../controllers/notificationCtrl')
const router=express.Router()

router.route('/notification/list')
.get(notificationCtrl.list)
router.route('/notification/create')
.post(notificationCtrl.create)
router.route('/notification/read')
.get(notificationCtrl.read)
router.route('/notification/update')
.put(notificationCtrl.update)
router.route('/notification/remove')
.delete(notificationCtrl.remove)

module.exports= router


// router.route('/enrollment/enrolled')
//  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)
