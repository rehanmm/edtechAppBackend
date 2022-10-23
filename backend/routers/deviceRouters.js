const  express  = require('express');
const deviceCtrl = require('../controllers/deviceCtrl')
const {authenticateToken,hasAuthorisation} = require( '../middleware/adminAuthMiddleware')
const {isModerator,isCourseManager,isAdmin,isAdminOrCourseManager,isAdminOrCourseManagerOrModerator}=require('../middleware/rolesAuthorization')
const router=express.Router()
// {
//     changeDeviceRequest,
//     changeStatus,
//     changeDeviceHistory,
//     isDeviceChanged
// }
router.route('/auth/changeDevice')
.post(deviceCtrl.changeDeviceRequest)
router.route('/auth/isDeviceChanged')
.post(deviceCtrl.isDeviceChanged)
router.route('/admin/changeDevice')
.post(authenticateToken,hasAuthorisation,isAdmin,deviceCtrl.changeStatus)



module.exports=router;