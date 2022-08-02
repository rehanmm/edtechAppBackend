const  express  = require('express');
const userCtrl =require( '../controllers/userCtrl')
const router=express.Router()
//  console.log(userCtrl);
 
router.route('/users')
.get(userCtrl.list)
.post(userCtrl.create)
router.route('/users/:userId')
.get(userCtrl.read)
.put(userCtrl.update)
.delete(userCtrl.remove)

router.param('userId',userCtrl.userById)

module.exports= router