const app=require('./express')
const mongoose=require('mongoose')

const dotenv = require('dotenv')
const config=require('../backend/config/config')
const exitHandler=require('./error/shutdown')
dotenv.config()
//uncaughtException error handling
process.on('uncaughtException',exitHandler(0,'uncaughtException'))
mongoose.connect( config.MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true, 
})
.then(()=>console.log('connected to database'))
.catch((err)=>console.log(err.stack||error))

process.on('SIGTERM', exitHandler(0,'SIGTERM'))
process.on('SIGINT',exitHandler(0, 'SIGTINT'))
process.on('unhandledRejection',exitHandler(0,'unhandledRejection'))    


module.exports = app;



