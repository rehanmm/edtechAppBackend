const  express  = require('express');
const unitCtrl =require('../controllers/unitCtrl')
const blockUserMiddleware =require('../middleware/blockedUserMiddleware')
const { authenticateToken, hasAuthorisation } = require('../middleware/adminAuthMiddleware')
const {isModerator,isCourseManager,isAdmin,isAdminOrCourseManager,isAdminOrCourseManagerOrModerator}=require('../middleware/rolesAuthorization')
const router=express.Router()


router.route('/ui/unit')
.post(unitCtrl.read)
//TODO:check ui unit completed lessons
router.route('/admin/unit/list')
.post(authenticateToken,hasAuthorisation,isAdminOrCourseManagerOrModerator,unitCtrl.list)
router.route('/admin/unit/create')
.post(authenticateToken,hasAuthorisation,isAdminOrCourseManager,unitCtrl.create)

router.route('/admin/getUnit')
.post(authenticateToken,hasAuthorisation,isAdminOrCourseManagerOrModerator,unitCtrl.getUnit)
router.route('/admin/unit/update')
.put(authenticateToken,hasAuthorisation,isAdminOrCourseManager,unitCtrl.update)
router.route('/admin/unit/update/position')
.put(authenticateToken,hasAuthorisation,isAdminOrCourseManager,unitCtrl.updateUnitPosition)
router.route('/admin/unit/remove')
.delete(authenticateToken,hasAuthorisation,isAdminOrCourseManager,unitCtrl.remove)



module.exports= router