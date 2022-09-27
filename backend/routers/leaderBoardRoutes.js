const  express  = require('express')
const leaderBoardCtrl =require( '../controllers/leaderBoardCtrl')
const router=express.Router()
const {authenticateToken,hasAuthorisation} = require( '../middleware/adminAuthMiddleware')

// router.route('/admin/aws/list')
// .post(authenticateToken,hasAuthorisation,awsCtrl.list)
// router.route('/admin/aws/create')
// .post(authenticateToken,hasAuthorisation,awsCtrl.create)
router.route('/admin/leaderboard/ranklist')
.post(authenticateToken,hasAuthorisation,leaderBoardCtrl.rankList)
router.route('/admin/leaderboard/create')
.post(leaderBoardCtrl.create)
router.route('/admin/leaderboard/position')
.post(authenticateToken,hasAuthorisation,leaderBoardCtrl.rankPostion)
router.route('/admin/leaderboard/surrounding')
.post(authenticateToken,hasAuthorisation,leaderBoardCtrl.rankSurronding) 
router.route('/ui/leaderboard/ranklist')
.post(leaderBoardCtrl.apprankList)
router.route('/ui/leaderboard/surrounding')
.post(leaderBoardCtrl.rankSurronding) 





module.exports= router


// router.route('/enrollment/enrolled')
//  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)
