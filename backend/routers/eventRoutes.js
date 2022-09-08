const  express  = require('express')
const eventCtrl =require( '../controllers/eventCtrl')
const router=express.Router()


router.route('/list')
.post(eventCtrl.list)
router.route('/create')
.post(eventCtrl.create)
router.route('/read')
.post(eventCtrl.read)
router.route('/update')
.put(eventCtrl.update)
router.route('/remove')
.delete(eventCtrl.remove)

module.exports= router


// router.route('/enrollment/enrolled')
//  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)
