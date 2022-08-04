const  express  = require('express');
const homeCtrl =require('../controllers/homectrl')
const userCtrl =require('../controllers/userCtrl')
const router=express.Router()

router.route('/ui/home')
.get(homeCtrl.list)

router.param('userId',userCtrl.userById)
module.exports=router;