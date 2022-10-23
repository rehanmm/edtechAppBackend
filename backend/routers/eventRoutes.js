const  express  = require('express')
const eventCtrl = require('../controllers/eventCtrl')
const { authenticateToken, hasAuthorisation } = require('../middleware/adminAuthMiddleware')
const {isModerator,isCourseManager,isAdmin,isAdminOrCourseManager,isAdminOrCourseManagerOrModerator}=require('../middleware/rolesAuthorization')
const router=express.Router()


router.route('/event/list')
.post(eventCtrl.list)
router.route('/event/create')
.post(authenticateToken, hasAuthorisation,isAdminOrCourseManager,eventCtrl.create)
router.route('/event/read')
.post(authenticateToken, hasAuthorisation,isAdminOrCourseManager,eventCtrl.read)
router.route('/event/update')
.put(authenticateToken, hasAuthorisation,isAdminOrCourseManager,eventCtrl.update)
router.route('/event/remove')
.delete(authenticateToken, hasAuthorisation,isAdminOrCourseManager,eventCtrl.remove)
router.route('/event/subscribe')
.post(eventCtrl.subscribeEvent)
router.route('/events/getDetails')
.post(eventCtrl.getDetails)

module.exports= router


