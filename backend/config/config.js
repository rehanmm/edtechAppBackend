exports.PORT = process.env.PORT || 3000;
exports.MONGODB_URI = process.env.MONGODB_URI||'mongodb://localhost:27017/mydb';
exports.NODE_ENV = process.env.NODE_ENV;
exports.SECRET_KEY = process.env.SECRET_KEY||'abcd';//abcd -- 3fa8b1b18da769139b8e045c4e1b842e//app secret key
exports.JWT_SECRET_KEY=process.env.JWT_SECRET_KEY||'3fa8b1b18da769139b8e045c4e1b842e'
exports.COURSE_ID=process.env.COURSE_ID||'62eb70e4bcc3b3486d2af137'



