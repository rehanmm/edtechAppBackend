const  express  = require('express')
const leaderBoardCtrl =require( '../controllers/leaderBoardCtrl')
const router=express.Router()
const {authenticateToken,hasAuthorisation} = require( '../middleware/adminAuthMiddleware')

// router.route('/admin/aws/list')
// .post(authenticateToken,hasAuthorisation,awsCtrl.list)
// router.route('/admin/aws/create')
// .post(authenticateToken,hasAuthorisation,awsCtrl.create)
router.route('/admin/leaderboard/read')
.post(authenticateToken,hasAuthorisation,leaderBoardCtrl.read)

// router.route('/admin/aws/remove')
// .delete(authenticateToken,hasAuthorisation,awsCtrl.remove)

module.exports= router


// router.route('/enrollment/enrolled')
//  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)
