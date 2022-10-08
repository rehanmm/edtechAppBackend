const  express  = require('express')
const eventCtrl =require( '../controllers/eventCtrl')
const router=express.Router()


router.route('/event/list')
.post(eventCtrl.list)
router.route('/event/create')
.post(eventCtrl.create)
router.route('/event/read')
.post(eventCtrl.read)
router.route('/event/update')
.put(eventCtrl.update)
router.route('/event/remove')
.delete(eventCtrl.remove)
router.route('/event/subscribe')
.post(eventCtrl.subscribeEvent)
router.route('/events/getDetails')
.post(eventCtrl.getDetails)

module.exports= router


