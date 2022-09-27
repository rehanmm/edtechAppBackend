const express =require('express');
const router = express.Router();
const {createTags,getAllTags }=require('../controllers/tagsCtrl')



router.route("/ui/tags").
post(getAllTags);
router.route("/tags/create").
post(createTags);




module.exports=router;