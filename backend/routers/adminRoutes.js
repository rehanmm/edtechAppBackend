const  express  = require('express');
const adminCtrl = require( '../controllers/adminCtrl')
const { authenticateToken, hasAuthorisation } = require('../middleware/adminAuthMiddleware')
const {isModerator,isCourseManager,isAdmin,isAdminOrCourseManager,isAdminOrCourseManagerOrModerator}=require('../middleware/rolesAuthorization')
// const adminCtrl = require( '../controllers/adminCtrl.js')
const router = express.Router()



router.route('/admin/forum/get-user-question')
.post(authenticateToken,hasAuthorisation,isAdmin,adminCtrl.Qlist)
router.route('/admin/forum/getAllquestion')
.post(authenticateToken,hasAuthorisation,isAdmin,adminCtrl.QToplist)
router.route('/admin/forum/question/create')
.post(authenticateToken,hasAuthorisation,isAdmin,adminCtrl.Qcreate)
router.route('/admin/forum/question')
.post(authenticateToken,hasAuthorisation,isAdmin,adminCtrl.Qread)
router.route('/admin/forum/question/edit')
.put(authenticateToken,hasAuthorisation,isAdmin,adminCtrl.Qupdate)
router.route('/admin/forum/question/remove')
.delete(authenticateToken,hasAuthorisation,isAdmin,adminCtrl.Qremove)
router.route('/admin/forum/listOfAnswer')
.post(authenticateToken,hasAuthorisation,isAdmin,adminCtrl.Alist)
router.route('/admin/forum/answer/create')
.post(authenticateToken,hasAuthorisation,isAdmin,adminCtrl.Acreate)
router.route('/admin/forum/answer/edit')
.put(authenticateToken,hasAuthorisation,isAdmin,adminCtrl.Aupdate)
router.route('/admin/forum/answer/remove')
.delete(authenticateToken,hasAuthorisation,isAdmin,adminCtrl.Aremove)
router.route('/admin/user-information')
.post(authenticateToken,hasAuthorisation,isAdmin,adminCtrl.userInfo)

module.exports= router