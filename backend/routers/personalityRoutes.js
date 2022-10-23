const express = require('express');
const router = express.Router();
const personalityCtrl = require('../controllers/personalityCtrl');
const { authenticateToken, hasAuthorisation } = require('../middleware/adminAuthMiddleware')
const {isModerator,isCourseManager,isAdmin,isAdminOrCourseManager,isAdminOrCourseManagerOrModerator}=require('../middleware/rolesAuthorization')


router.route('/ui/personality/startTest')
    .post(personalityCtrl.startTest)
router.route('/ui/personality/test/create')
    .post(personalityCtrl.createTest)

router.route('/ui/personality/endTest')
    .post(personalityCtrl.endtTest)

router.route('/ui/personality/get')
    .post(personalityCtrl.getPersonality)
router.route('/admin/personality/test/create')
    .post(authenticateToken,hasAuthorisation,isAdminOrCourseManager,personalityCtrl.createTest)
router.route('/admin/personality/test/update')
    .put(authenticateToken,hasAuthorisation,isAdminOrCourseManager,personalityCtrl.updateTest)
router.route('/admin/personality/test/read')
    .post(personalityCtrl.startTest)

    module.exports = router;