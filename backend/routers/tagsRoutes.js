const express =require('express');
const router = express.Router();
const { createTags, getAllTags } = require('../controllers/tagsCtrl')
const { authenticateToken, hasAuthorisation } = require('../middleware/adminAuthMiddleware')
const {isModerator,isCourseManager,isAdmin,isAdminOrCourseManager,isAdminOrCourseManagerOrModerator}=require('../middleware/rolesAuthorization')



router.route("/ui/tags").
post(getAllTags);
router.route("/admin/tags").
post(authenticateToken,hasAuthorisation,isAdminOrCourseManager,getAllTags);
router.route("/tags/create").
post(createTags);




module.exports=router;