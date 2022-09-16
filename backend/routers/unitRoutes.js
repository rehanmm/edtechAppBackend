const  express  = require('express');
const unitCtrl =require('../controllers/unitCtrl')
const blockUserMiddleware =require('../middleware/blockedUserMiddleware')
const {authenticateToken,hasAuthorisation} = require( '../middleware/adminAuthMiddleware')
const router=express.Router()


router.route('/ui/unit')
.post(unitCtrl.read)
//TODO:check ui unit completed lessons
router.route('/admin/unit/list')
.post(authenticateToken,hasAuthorisation,unitCtrl.list)
router.route('/admin/unit/create')
.post(authenticateToken,hasAuthorisation,unitCtrl.create)

router.route('/admin/unit')
.post(authenticateToken,hasAuthorisation,unitCtrl.read)
router.route('/admin/unit/update')
.put(authenticateToken,hasAuthorisation,unitCtrl.update)
router.route('/admin/unit/update/position')
.put(authenticateToken,hasAuthorisation,unitCtrl.updateUnitPosition)
router.route('/admin/unit/remove')
.delete(authenticateToken,hasAuthorisation,unitCtrl.remove)



module.exports= router