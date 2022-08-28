const  express  = require('express');
const userCtrl =require( '../controllers/userCtrl')
const {authenticateToken,hasAuthorisation} = require( '../middleware/adminAuthMiddleware')
const router=express.Router()
//  console.log(userCtrl);
 
// .post(userCtrl.create)
router.use(authenticateToken,hasAuthorisation)
router.route('/admin/user/read')
.get(userCtrl.read)
router.route('/admin/user/update')//also update on fire base
.put(userCtrl.update)
router.route('/admin/user/remove')//also remove from firebase
.delete(userCtrl.remove)

router.route('/admin/users')
.post(userCtrl.list)

module.exports= router