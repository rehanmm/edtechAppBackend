const express = require('express');
const router = express.Router();
const personalityCtrl = require('../controllers/personalityCtrl');


router.route('/ui/personality/startTest')
    .post(personalityCtrl.startTest)
router.route('/ui/personality/test/create')
    .post(personalityCtrl.createTest)

router.route('/ui/personality/endTest')
    .post(personalityCtrl.endtTest)


    module.exports = router;