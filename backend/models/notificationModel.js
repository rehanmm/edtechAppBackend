const mongoose=require('mongoose');

const notificationSchema = new mongoose.Schema({
title:String,
description:String,
link:String
},
{
    timestamps:{createdAt:'created_at',updatedAt:'updated_at'}
}
);

module.exports=mongoose.model('Notification',notificationSchema);