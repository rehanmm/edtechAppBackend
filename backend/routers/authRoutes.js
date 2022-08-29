const  express  = require('express');
const authCtrl =require( '../controllers/authCtrl')
const {authenticateToken,hasAuthorisation,verifyAdmin} = require( '../middleware/adminAuthMiddleware')
const router=express.Router()




router.route('/admin/login')
.post(authCtrl.signin)

// router.route('/auth/anonymous')
// .post(authCtrl.anonymous)

router.route('/admin/new-admin')
.post(authenticateToken,hasAuthorisation,authCtrl.createNewAdmin)
router.route('/admin/signout')
.post(authCtrl.signout)

router.route('/admin/remove-admin')
.post(authenticateToken,hasAuthorisation,authCtrl.removeAdmin)
router.route('/admin/list-admins')
.post(authenticateToken,hasAuthorisation,authCtrl.listAdmins)
router.route('/admin/single-admin')
.post(authenticateToken,hasAuthorisation,authCtrl.readAdmin)
// router.route('/admin/update-admin')
// .put(authenticateToken,hasAuthorisation,authCtrl.updateAdmin)

// router.route('/admin/admin/update/role')
// .put(authenticateToken,hasAuthorisation,authCtrl.updateAdminRole)


module.exports=router