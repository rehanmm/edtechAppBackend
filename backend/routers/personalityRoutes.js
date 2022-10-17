const express = require('express');
const router = express.Router();
const personalityCtrl = require('../controllers/personalityCtrl');


router.route('/ui/personality/startTest')
    .post(personalityCtrl.startTest)
router.route('/ui/personality/test/create')
    .post(personalityCtrl.createTest)

router.route('/ui/personality/endTest')
    .post(personalityCtrl.endtTest)

router.route('/ui/personality/get')
    .post(personalityCtrl.getPersonality)
router.route('/personality/test/create')
    .post(personalityCtrl.createTest)
router.route('/personality/test/update')
    .put(personalityCtrl.updateTest)

    module.exports = router;