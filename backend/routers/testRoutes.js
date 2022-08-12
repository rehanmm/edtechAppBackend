const  express  = require('express');
const testCtrl =require( '../controllers/testCtrl')
const router=express.Router()

// router.route('/admin/lessons')
// .get(testCtrl.getTestQuestion)
router.route('/ui/startTest')
.post(testCtrl.startTest)

router.route('/ui/submitTest')
.post(testCtrl.submitTest)

// router.route('/ui/testResult')
// .get(testCtrl.testREsult)

module.exports= router