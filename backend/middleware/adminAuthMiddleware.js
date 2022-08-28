const catchAsyncError=require('../error/catchAsyncError')
const errorHandler=require('../utils/errorHandler')
const jwt=require('jsonwebtoken')
const config=require('../config/config')
const Admin=require('../models/adminModel')

    const hasAuthorisation =catchAsyncError(function(req, res, next){
      console.log(req.auth)
      console.log(req.profile)
        const authorized = req.profile && req.auth
        && req.profile._id == req.auth.admin_id
        if (!(authorized)) {
        return next(new errorHandler('User is not authorized',403));
        }
        next()
       })

    const verifyAdmin =catchAsyncError(async function(req, res, next){
      const  {admin_id} = req.body
    
        if(typeof admin_id==undefined){
           return next(new errorHandler('Admin id is required',401));
        }
      const admin = await Admin.findById(admin_id);
    //   console.log(admin)

      if(!admin){
        return next(new errorHandler('Admin not found',401));
      }
      req.profile=admin
      console.log(admin)
      next()
       })

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]

//   if (token == null) return res.sendStatus(401)
//   jwt.verify(token, config.JWT_SECRET_KEY , (err, user) => {
   
//     if (err) {
        
//         return res.json({
//             success: true,
//             message:'token is not valid please login'
    
//         })}
//     if (!user) {
//       return  next(new errorHandler('Not authenticated',401));
//       }
//     req.auth = user
//     next()
//   })
// }

function authenticateToken(req, res, next) {
const token=req.cookies.jwt
console.log(token)
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, config.JWT_SECRET_KEY , (err, user) => {
   
    if (err) {
        
        return res.json({
            success: true,
            message:'token is not valid please login'
    
        })}
    if (!user) {
      return  next(new errorHandler('Not authenticated',401));
      }
    req.auth = user
    next()
  })
}

module.exports={authenticateToken,hasAuthorisation,verifyAdmin}