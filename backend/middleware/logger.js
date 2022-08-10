const logger=function(req,res,next){
    console.log(res);
    next();
}

module.exports=logger;