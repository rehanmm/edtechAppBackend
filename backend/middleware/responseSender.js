const send=function(data,message,res){
    data=JSON.stringify(data);
   data=Buffer.from(data).toString('base64');
    obj={}
    obj.success=true;
    obj.message=message;
    obj.data=data;
res.status(200).json(obj);

}
const tsend=function(data,message,res){
    obj={}
    obj.success=true;
    obj.message=message;
    obj.data=data;
res.status(200).json(obj);

}

module.exports={send,tsend};