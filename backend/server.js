const app=require('./express')
const mongoose=require('mongoose')
const dotenv = require("dotenv")
const config=require('../backend/config/config')
// const errorHandler = require('./utils/errorHandler')

dotenv.config()
port=config.PORT


// const error= new errorHandler('me',100);

//uncaughtException error handling
process.on('uncaughtException',(err)=>{
    console.timeLog(`Error:${err.message}`);
    console.log('Shutting down the server due to uncaughtException');
    server = app.listen(port)

    server.close();
    
})
// console.log(config.MONGODB_URI)
// console.log(config.MONGODB_URI.toString())
mongoose.connect( "mongodb+srv://quasar-edtech:MongoDB@quasar.so7kqha.mongodb.net/?retryWrites=true&w=majority")
.then(()=>console.log('connected to database'))
.catch((err)=>console.log(err))


//unhandaled promise rejection
process.on('unhandledRejection',(err)=>{
    console.timeLog(`Error:${err.message}`);
    console.log('Shutting down the server due to ');
    
    server = app.listen(port)
    server.close(()=>{
        process.exit(1);
    })
    
})    



app.listen(port, function (err) {
    if(err){
        console.log("error while starting server");
    }
    else{
        console.log("server has been started at port "+port);
    }
})



