const  express  = require('express');
const testCtrl =require( '../controllers/testCtrl')
const router=express.Router()

router.route('/admin/lessons')
.get(testCtrl.getTestQuestion)
router.route('/ui/startTest')
.post(testCtrl.StartTest)

router.route('/ui/submitTest')
.get(testCtrl.submitTest)

// router.route('/ui/testResult')
// .get(testCtrl.testREsult)

module.exports= router