const  express  = require('express');
const firebaseAuthCtrl = require('../controllers/fireBaseAuthCtrl')
const {isModerator,isCourseManager,isAdmin,isAdminOrCourseManager,isAdminOrCourseManagerOrModerator}=require('../middleware/rolesAuthorization')
const router=express.Router()

router.route('/auth/login')
.post(firebaseAuthCtrl.login)
router.route('/user/update/name')
.post(firebaseAuthCtrl.update)
router.route('/auth/anonymous')
.post(firebaseAuthCtrl.anonymous)

module.exports=router;