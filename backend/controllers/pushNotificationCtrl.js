



const admin = require('firebase-admin');
let serviceAccount = require('../config/quaser-edtech-firebase-adminsdk-7yvco-33641cf2b5.json');
// const c = require('config');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});






const sendToAll= catchAsyncError( async function(req ,res){
    const message={
        notification: { title: 'test notification', body: '5% off all electronics' }
    }
    admin.messaging().sendAll(message)

    

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