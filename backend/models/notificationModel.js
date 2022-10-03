const mongoose=require('mongoose');

const notificationSchema = new mongoose.Schema({
title:String,
description:String,
    link: String,
    created_at: {
        type: Number,
        default: Date.now()
    }

}
);

module.exports=mongoose.model('Notification',notificationSchema);