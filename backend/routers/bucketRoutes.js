const  express  = require('express')
const bucketCtrl =require( '../controllers/bucketCtrl')
const router=express.Router()
const {authenticateToken,hasAuthorisation} = require( '../middleware/adminAuthMiddleware')

router.route('/admin/bucket/read')
.post(authenticateToken,hasAuthorisation,bucketCtrl.read)
router.route('/admin/bucket/update')
.put(authenticateToken,hasAuthorisation,bucketCtrl.update)

module.exports= router
