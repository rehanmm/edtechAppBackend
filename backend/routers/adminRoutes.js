const  express  = require('express');
const adminCtrl = require( '../controllers/adminCtrl')
const {authenticateToken,hasAuthorisation} = require( '../middleware/adminAuthMiddleware')
// const adminCtrl = require( '../controllers/adminCtrl.js')
const router = express.Router()



router.route('/admin/forum/get-user-question')
.post(authenticateToken,hasAuthorisation,adminCtrl.Qlist)
router.route('/admin/forum/getAllquestion')
.post(authenticateToken,hasAuthorisation,adminCtrl.QToplist)
router.route('/admin/forum/question/create')
.post(authenticateToken,hasAuthorisation,adminCtrl.Qcreate)
router.route('/admin/forum/question')
.post(authenticateToken,hasAuthorisation,adminCtrl.Qread)
router.route('/admin/forum/question/edit')
.put(authenticateToken,hasAuthorisation,adminCtrl.Qupdate)
router.route('/admin/forum/question/remove')
.delete(authenticateToken,hasAuthorisation,adminCtrl.Qremove)
router.route('/admin/forum/listOfAnwser')
.post(authenticateToken,hasAuthorisation,adminCtrl.Alist)
router.route('/admin/forum/answer/create')
.post(authenticateToken,hasAuthorisation,adminCtrl.Acreate)
router.route('/admin/forum/answer/edit')
.put(authenticateToken,hasAuthorisation,adminCtrl.Aupdate)
router.route('/admin/forum/answer/remove')
.delete(authenticateToken,hasAuthorisation,adminCtrl.Aremove)
router.route('/admin/user-information')
.post(authenticateToken,hasAuthorisation,adminCtrl.userInfo)

module.exports= router