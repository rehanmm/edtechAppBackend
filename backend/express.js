const express=require('express');
const app=express();
const cookieparser=require('cookie-parser');
const userRoutes=require('../backend/routers/userRoutes')
const courseRoutes=require('../backend/routers/courseRoutes')
const lessonRoutes=require('../backend/routers/lessonRoutes')
const authRoutes=require('../backend/routers/authRoutes');
const homeRoutes=require('../backend/routers/homeRoutes');
const unitRoutes=require('../backend/routers/unitRoutes');
const enrollRoutes=require('../backend/routers/enrollRoutes');
const errorMiddleware=require('./error/errorMiddleware')

// middleware parser
app.get('/', (req, res,next) => {
  

   next({message:'fuck'}) // Express will catch this on its own.
  })


app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({extended:true}));


app.use('/edtech',authRoutes);
app.use('/edtech',userRoutes);
app.use('/edtech',courseRoutes);
app.use('/edtech',lessonRoutes);
app.use('/edtech',enrollRoutes);
app.use('/edtech',homeRoutes);
app.use('/edtech',unitRoutes);



app.get('*', function (req, res) {
    res.send('invalid url');
})
  





// error middleware
app.use(errorMiddleware);
module.exports= app
