



const {admin}= require('../controllers/fireBaseAuthCtrl');
const catchAsyncError=require('../error/catchAsyncError')
// let serviceAccount = require('../config/quaser-edtech-firebase-adminsdk-7yvco-33641cf2b5.json');
// // const c = require('config');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });






exports.sendToAll= catchAsyncError( async function(message){
  
  const result= await  admin.messaging().sendToTopic('all',message)
 console.log(result)
})



const sendToMultiple = catchAsyncError( async function(req ,res){
    const {notification_id}=req.body
       await Notification.findByIdAndUpdate(notification_id,req.body)
      const updatedvalue=await Notification.findById(notification_id).lean()
       tsend(updatedvalue,'updated successfully',res)
        
    
    })
    const sendToParticular = catchAsyncError( async function(req ,res){
    const {notification_id}=req.body
       await Notification.findByIdAndUpdate(notification_id,req.body)
      const updatedvalue=await Notification.findById(notification_id).lean()
       tsend(updatedvalue,'updated successfully',res)
        
    
    })