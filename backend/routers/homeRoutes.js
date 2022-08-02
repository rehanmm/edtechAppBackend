const  express  = require('express');
const homeCtrl =require('../controllers/homectrl')
const router=express.Router()

router.route('/home')
.get(homeCtrl.list)


module.exports=router;