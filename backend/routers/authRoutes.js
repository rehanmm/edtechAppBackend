const  express  = require('express');
const authCtrl =require( '../controllers/authCtrl')
const {authenticateToken,hasAuthorisation} = require( '../middleware/adminAuthMiddleware')
const router = express.Router()
const {isModerator,isCourseManager,isAdmin}=require('../middleware/rolesAuthorization')

router.route('/admin/login')
.post(authCtrl.signin)

// router.route('/auth/anonymous')
// .post(authCtrl.anonymous)

router.route('/admin/new-admin')
.post(authenticateToken,hasAuthorisation,isAdmin,authCtrl.createNewAdmin)
router.route('/admin/signout')
.post(isAdmin,authCtrl.signout)

router.route('/admin/remove-admin')
.post(authenticateToken,hasAuthorisation,isAdmin,authCtrl.removeAdmin)
router.route('/admin/list-admins')
.post(authenticateToken,hasAuthorisation,isAdmin,authCtrl.listAdmins)
router.route('/admin/single-admin')
.post(authenticateToken,hasAuthorisation,isAdmin,authCtrl.readAdmin)
// router.route('/admin/update-admin')
// .put(authenticateToken,hasAuthorisation,authCtrl.updateAdmin)

// router.route('/admin/admin/update/role')
// .put(authenticateToken,hasAuthorisation,authCtrl.updateAdminRole)


module.exports=router