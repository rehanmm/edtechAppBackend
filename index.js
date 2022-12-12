const app = require('./backend/server');

app.listen(config.PORT, function (err) {
    if(err){
        console.log("error while starting server");
        console.log(err);
        console.log(err.stack);
    }
    else{
        console.log("server has been started at port "+config.PORT);
    }
})
