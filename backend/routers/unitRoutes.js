const  express  = require('express');
const unitCtrl =require('../controllers/unitCtrl')
const router=express.Router()

router.route('/ui/unit')
.post(unitCtrl.read)
router.route('/admin/course/units')
.post(unitCtrl.list)
router.route('/admin/unit/create')
.post(unitCtrl.create)

router.route('/admin/unit')
.post(unitCtrl.read)
router.route('/admin/unit/update')
.put(unitCtrl.update)
router.route('/unit/update/position')
.put(unitCtrl.updateUnitPosition)
router.route('/admin/unit/remove')
.delete(unitCtrl.remove)



module.exports= router