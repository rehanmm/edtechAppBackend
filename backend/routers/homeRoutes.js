const  express  = require('express');
const homeCtrl =require('../controllers/homectrl')
const userCtrl =require('../controllers/userCtrl')
const router=express.Router()

router.route('/ui/home')
.post(homeCtrl.list)

module.exports=router;