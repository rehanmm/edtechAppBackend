const express=require('express');
const app=express();
const cors = require('cors');
const cookieparser=require('cookie-parser');
const userRoutes=require('../backend/routers/userRoutes')
const courseRoutes=require('../backend/routers/courseRoutes')
const lessonRoutes=require('../backend/routers/lessonRoutes')
const homeRoutes=require('../backend/routers/homeRoutes');
const unitRoutes=require('../backend/routers/unitRoutes');
const forumRoutes=require('../backend/routers/forumRoutes');
const testRoutes=require('../backend/routers/testRoutes');
const errorMiddleware=require('./error/errorMiddleware')
const authRoutes=require('../backend/routers/authRoutes');
const firebaseAuthRoutes=require('../backend/routers/firebaseRoutes');
const assignmentRoutes=require('../backend/routers/assignmentRoutes');
const adminRoutes=require('../backend/routers/adminRoutes');
const razorpayRoutes=require('../backend/routers/razorpayRoutes');
const awsRoutes=require('../backend/routers/awsRoutes');
const leaderBoardRoutes=require('../backend/routers/leaderBoardRoutes');
const bucketRoutes=require('../backend/routers/bucketRoutes');
const notificationRoutes=require('../backend/routers/notificationRoutes');
const eventRoutes=require('../backend/routers/eventRoutes');
const blockedUserRoutes=require('../backend/routers/blockedUserRoutes');
const paymentRoutes=require('../backend/routers/paymentRoutes');
const tagsRoutes=require('../backend/routers/tagsRoutes');
const personalityRoutes=require('../backend/routers/personalityRoutes');
const deviceRoutes=require('../backend/routers/deviceRouters');
const additionalLessonRoutes=require('../backend/routers/additionalLessonRoutes');
const marketingRoutes=require('../backend/routers/marketingTest');
const feedbackRoutes=require('../backend/routers/feedbackRoutes');

// const {base64Decoder,md5HashVerifier}=require('./middleware/hashingAndEncodingMiddleware')
// const logger=require('./middleware/logger')



app.use(express.json({limit: '15mb'}));
app.use(cookieparser());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
   
// app.use(base64Decoder);
// app.use(md5HashVerifier);
// app.use(logger);

// app.use('/edtech/admin/*',authRoutes);
app.use('/edtech',authRoutes);
app.use('/edtech',adminRoutes);
app.use('/edtech',razorpayRoutes);
app.use('/edtech',awsRoutes);
app.use('/edtech',bucketRoutes);
app.use('/edtech',leaderBoardRoutes);
app.use('/edtech',blockedUserRoutes);
app.use('/edtech',firebaseAuthRoutes);
app.use('/edtech',userRoutes);
app.use('/edtech',courseRoutes);
app.use('/edtech',lessonRoutes);
app.use('/edtech',forumRoutes);
app.use('/edtech',homeRoutes);
app.use('/edtech',unitRoutes);
app.use('/edtech',testRoutes);
app.use('/edtech',assignmentRoutes);
app.use('/edtech',eventRoutes);
app.use('/edtech',paymentRoutes);
app.use('/edtech',tagsRoutes);
app.use('/edtech',notificationRoutes);
app.use('/edtech',personalityRoutes);
app.use('/edtech',deviceRoutes);
app.use('/edtech',additionalLessonRoutes);
app.use('/edtech',marketingRoutes);
app.use('/edtech',feedbackRoutes);



// const mongoose=require('mongoose');
// const Lesson=require('../backend/models/lessonModel');













app.get('*', function (req, res) {
    res.send('Yeah its Working!!');
})




// error middleware
app.use(errorMiddleware);
module.exports= app
