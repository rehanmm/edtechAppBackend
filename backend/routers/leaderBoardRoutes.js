const  express  = require('express')
const leaderBoardCtrl =require( '../controllers/leaderBoardCtrl')
const {testFunc} =require( '../controllers/leaderboard')
const router=express.Router()
const { authenticateToken, hasAuthorisation } = require('../middleware/adminAuthMiddleware')
const {isModerator,isCourseManager,isAdmin,isAdminOrCourseManager,isAdminOrCourseManagerOrModerator}=require('../middleware/rolesAuthorization')


// router.route('/admin/aws/list')
// .post(authenticateToken,hasAuthorisation,awsCtrl.list)
// router.route('/admin/aws/create')
// .post(authenticateToken,hasAuthorisation,awsCtrl.create)
router.route('/admin/leaderboard/ranklist')
.post(authenticateToken,hasAuthorisation,isAdminOrCourseManagerOrModerator,leaderBoardCtrl.rankList)
router.route('/leaderboard/create')
.post(testFunc)
router.route('/admin/leaderboard/position')
.post(authenticateToken,hasAuthorisation,isAdminOrCourseManagerOrModerator,leaderBoardCtrl.rankPostion)
router.route('/admin/leaderboard/surrounding')
.post(authenticateToken,hasAuthorisation,isAdminOrCourseManagerOrModerator,leaderBoardCtrl.rankSurronding) 
router.route('/ui/leaderboard/ranklist')
.post(leaderBoardCtrl.apprankList)
router.route('/ui/leaderboard/surrounding')
.post(leaderBoardCtrl.rankSurronding) 
router.route('/ui/test/leaderboard')
.post(leaderBoardCtrl.testWise) 





module.exports= router


// router.route('/enrollment/enrolled')
//  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)
