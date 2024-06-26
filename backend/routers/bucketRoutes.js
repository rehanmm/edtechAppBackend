const  express  = require('express')
const bucketCtrl =require( '../controllers/bucketCtrl')
const router=express.Router()
const { authenticateToken, hasAuthorisation } = require('../middleware/adminAuthMiddleware')
const {isModerator,isCourseManager,isAdmin,isAdminOrCourseManager,isAdminOrCourseManagerOrModerator}=require('../middleware/rolesAuthorization')

router.route('/admin/bucket/read')
.post(authenticateToken,hasAuthorisation,isAdmin,bucketCtrl.read)
router.route('/admin/bucket/update')
.put(authenticateToken,hasAuthorisation,isAdmin,bucketCtrl.update)

module.exports= router
