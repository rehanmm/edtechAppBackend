const  express  = require('express');
const homeCtrl =require('../controllers/homectrl')
const userCtrl =require('../controllers/userCtrl')
const router=express.Router()

router.route('/ui/home')
.post(homeCtrl.list)

router.param('userId',userCtrl.userById)
module.exports=router;