const  express  = require('express');
const userCtrl =require( '../controllers/userCtrl')
const { authenticateToken, hasAuthorisation } = require('../middleware/adminAuthMiddleware')
const {isModerator,isCourseManager,isAdmin,isAdminOrCourseManager,isAdminOrCourseManagerOrModerator}=require('../middleware/rolesAuthorization')
const router=express.Router()
const {uploadprofile}=require('../middleware/uploadMiddleware')

//  console.log(userCtrl);
 
// .post(userCtrl.create)

router.route('/admin/user/read')
.get(authenticateToken,hasAuthorisation,isAdminOrCourseManagerOrModerator,userCtrl.read)
router.route('/admin/user/update')//also update on fire base
.put(authenticateToken,hasAuthorisation,isAdmin,userCtrl.update)//
router.route('/admin/user/remove')//also remove from firebase
.delete(authenticateToken,hasAuthorisation,isAdmin,userCtrl.remove)
router.route('/admin/users')
.post(authenticateToken,hasAuthorisation,isAdmin,userCtrl.list)
router.route('/user/displayPicture/update')
.post(uploadprofile,userCtrl.displayPicture)
router.route('/ui/user/events')
.post(userCtrl.getSubbedEvents)

module.exports= router