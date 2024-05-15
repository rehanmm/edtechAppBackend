const app = require('./backend/server');
app.listen(3000, function (err) {
    if(err){
        console.log("error while starting server");
        console.log(err);
        console.log(err.stack);
    }
    else{
        console.log("server has been started at port "+3000);
    }
})
