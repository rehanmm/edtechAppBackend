const  express  = require('express');
const questionCtrl = require( '../controllers/questionCtrl.js')
const answerCtrl = require( '../controllers/answerCtrl.js')
const router = express.Router()

router.route('/forum/getAllQuestion')
.post(questionCtrl.list)
// router.route('/forum/question/like')
// .get(questionCtrl.like)
router.route('/forum/question/create')
.post(questionCtrl.create)
router.route('/forum/question')
.post(questionCtrl.read)
router.route('/forum/question/edit')
.put(questionCtrl.update)
router.route('/forum/question/like')
.post(questionCtrl.like)
router.route('/forum/remove')
.delete(questionCtrl.remove)

// router.route('/forum/listOfAnwser')
// .get(questionCtrl.list)
router.route('/forum/answer/upvote')
.post(answerCtrl.upvote)
router.route('/forum/answer/create')
.post(answerCtrl.create)
// router.route('/forum/answer')
// .get(answerCtrl.read)
router.route('/forum/answer/edit')
.put(answerCtrl.update)
router.route('/forum/')
.delete(answerCtrl.remove)

module.exports= router


// router.route('/enrollment/enrolled')
//  .get(authCtrl.requireSignin, enrollmentCtrl.listEnrolled)
