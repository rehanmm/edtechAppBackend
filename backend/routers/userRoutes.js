const  express  = require('express');
const userCtrl =require( '../controllers/userCtrl')
const {authenticateToken,hasAuthorisation} = require( '../middleware/adminAuthMiddleware')
const router=express.Router()
const {uploadprofile}=require('../middleware/uploadMiddleware')

//  console.log(userCtrl);
 
// .post(userCtrl.create)

router.route('/admin/user/read')
.get(authenticateToken,hasAuthorisation,userCtrl.read)
router.route('/admin/user/update')//also update on fire base
.put(authenticateToken,hasAuthorisation,userCtrl.update)
router.route('/admin/user/remove')//also remove from firebase
.delete(authenticateToken,hasAuthorisation,userCtrl.remove)
router.route('/admin/users')
.post(authenticateToken,hasAuthorisation,userCtrl.list)
router.route('/user/displayPicture/update')
.post(uploadprofile,userCtrl.displayPicture)
router.route('/ui/user/events')
.post(userCtrl.getSubbedEvents)

module.exports= router