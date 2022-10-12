const catchAsyncError = require("../error/catchAsyncError");
const errorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const Admin = require("../models/adminModel");

const hasAuthorisation = catchAsyncError(async function (req, res, next) {
  // console.log("first called")
const {admin_id}=req.body;
  if (typeof admin_id == undefined) {
    return next(new errorHandler("Admin id is required", 401));
  }
  const admin = await Admin.findOne({ _id: admin_id });
  

  if (!admin) {
    return next(new errorHandler("require sign in", 401));
  }
  req.profile = admin;

  const authorized =
    req.profile && req.auth && req.profile._id == req.auth.admin_id;
  if (!authorized) {
     return next(new errorHandler("Unauthorized", 403));
  }
  next();
});

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

// const verifyAdmin = catchAsyncError(async function (req, res, next) {
//   console.log("hello")
//   // const { admin_id } = req.body;
//   console.log("admin_id");

//   if (typeof admin_id == undefined) {
//     return next(new errorHandler("Admin id is required", 401));
//   }
//   const admin = await Admin.findOne({ _id: admin_id });
  

//   if (!admin) {
//     return next(new errorHandler("Admin not found", 401));
//   }
//   req.profile = admin;
//   // console.log(req.profile)
//   next();
// });
function authenticateToken(req, res, next) {
  
    const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {return next(new errorHandler('token is not found in authorizarion header',401));
}

  jwt.verify(token, config.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(new errorHandler('token is not valid please login',401));
    }
    if (!user) {
      return next(new errorHandler("Not authenticated", 401));
    }
    req.auth = user;
    // console.log(req.auth)
  });
  // console.log("third called")
  next();
}

module.exports = { authenticateToken, hasAuthorisation };
