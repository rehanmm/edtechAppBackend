const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const {isModerator,isCourseManager,isAdmin,isAdminOrCourseManager,isAdminOrCourseManagerOrModerator}=require('../middleware/rolesAuthorization')

router.route('/ui/feedback')
    .post(feedbackController.createFeedback)
router.route('/admin/feedback/list')    
    .post(feedbackController.listFeedback)

module.exports = router;
