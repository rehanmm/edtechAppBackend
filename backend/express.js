const express=require('express');
const app=express();
const cors = require('cors');
const cookieparser=require('cookie-parser');
const userRoutes=require('../backend/routers/userRoutes')
const courseRoutes=require('../backend/routers/courseRoutes')
const lessonRoutes=require('../backend/routers/lessonRoutes')
const authRoutes=require('../backend/routers/authRoutes');
const homeRoutes=require('../backend/routers/homeRoutes');
const unitRoutes=require('../backend/routers/unitRoutes');
const forumRoutes=require('../backend/routers/forumRoutes');
const testRoutes=require('../backend/routers/testRoutes');
const errorMiddleware=require('./error/errorMiddleware')
// const {base64Decoder,md5HashVerifier}=require('./middleware/hashingAndEncodingMiddleware')
// const logger=require('./middleware/logger')



app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({extended:true}));
app.use(cors());
// app.use(base64Decoder);
// app.use(md5HashVerifier);


// app.use(logger);
app.use('/edtech',authRoutes);
app.use('/edtech',userRoutes);
app.use('/edtech',courseRoutes);
app.use('/edtech',lessonRoutes);
app.use('/edtech',forumRoutes);
app.use('/edtech',homeRoutes);
app.use('/edtech',unitRoutes);
app.use('/edtech',testRoutes);



app.get('*', function (req, res) {
    res.send('invalid url');
})






// error middleware
app.use(errorMiddleware);
module.exports= app
