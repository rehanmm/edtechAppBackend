const express = require('express');
const router = express.Router();
const personalityCtrl = require('../controllers/personalityCtrl');
const {authenticateToken,hasAuthorisation} = require( '../middleware/adminAuthMiddleware')


router.route('/ui/personality/startTest')
    .post(personalityCtrl.startTest)
router.route('/ui/personality/test/create')
    .post(personalityCtrl.createTest)

router.route('/ui/personality/endTest')
    .post(personalityCtrl.endtTest)

router.route('/ui/personality/get')
    .post(personalityCtrl.getPersonality)
router.route('/admin/personality/test/create')
    .post(authenticateToken,hasAuthorisation,personalityCtrl.createTest)
router.route('/admin/personality/test/update')
    .put(authenticateToken,hasAuthorisation,personalityCtrl.updateTest)

    module.exports = router;