const express = require('express');
const router = express.Router();
const marketingCtrl = require('../controllers/marketingCtrl');
const { authenticateToken, hasAuthorisation } = require('../middleware/adminAuthMiddleware')
const {isModerator,isCourseManager,isAdmin,isAdminOrCourseManager,isAdminOrCourseManagerOrModerator}=require('../middleware/rolesAuthorization')


router.route('/ui/marketing/startTest')
    .post(marketingCtrl.startTest)
router.route('/ui/marketing/test/create')
    .post(marketingCtrl.createTest)

router.route('/ui/marketing/endTest')
    .post(marketingCtrl.endtTest)

router.route('/ui/marketing/get')
    .post(marketingCtrl.getMarketing)
router.route('/admin/marketing/test/create')
    .post(authenticateToken,hasAuthorisation,isAdminOrCourseManager,marketingCtrl.createTest)
router.route('/admin/marketing/test/update')
    .put(authenticateToken,hasAuthorisation,isAdminOrCourseManager,marketingCtrl.updateTest)
router.route('/admin/marketing/test/read')
    .post(authenticateToken,hasAuthorisation,isAdminOrCourseManager,marketingCtrl.startTest)

    module.exports = router;