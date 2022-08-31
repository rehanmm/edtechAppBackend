const  express  = require('express');
const testCtrl =require( '../controllers/testCtrl')
const blockUserMiddleware=require('../middleware/blockedUserMiddleware')
const router=express.Router()

// router.route('/admin/lessons')
// .get(testCtrl.getTestQuestion)
router.route('/ui/test/start')
.post(blockUserMiddleware,testCtrl.startTest)

router.route('/ui/test/submit')
.post(blockUserMiddleware,testCtrl.submitTest)

// router.route('/ui/testResult')
// .get(testCtrl.testREsult)

module.exports= router