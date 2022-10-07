const Device = require('../models/deviceModel');
const User = require('../models/userModel');
const express = require('express');
const catchAsyncError = require('../error/catchAsyncError')
const errorHandler = require('../utils/errorHandler');
const { send, tsend } = require('../middleware/responseSender');



const changeDeviceRequest = catchAsyncError(async function (req, res, next) {
    const { user_id, new_device_id, message } = req.body;
    let  is_old_request_pending = false;
    const device = await Device.findOne({ user_id });
    if (!device) {
        const newDevice = new Device({
            user_id: user_id,
            new_device_id: new_device_id,
            status: "pending",
            created_at: Date.now()
        }
        );
        await newDevice.save();
       return tsend({}, "New device request created successfully", res);
       
    }

    if (device.status == 'pending') {
       is_old_request_pending = true;
       return tsend({
            is_old_request_pending,
            is_new_request_created:false,
            message,
            device_id:new_device_id
    
        }, 'Device change request already sent', res);
    }

    if (device.status == 'accepted') {

        return tsend({
            is_old_request_pending,
            is_new_request_created:false,
            message,
            device_id:device.new_device_id
    
        }, 'Device change request already accepted', res);
       
    }
 
    device.status = 'pending';
    device.new_device_id = new_device_id;
    device.message = message;
    await device.save();
    


   return tsend({
        is_old_request_pending,
        is_new_request_created:true,
        message: String,
        device_id: String

    }, 'Device change request sent', res);
})

const changeStatus = catchAsyncError(async function (req, res, next) {
    const { user_id,accept,placeholde } = req.body;
    const device = await Device.findOne({ user_id });
    if (!device) {
        return next(new errorHandler('Device not found', 404));
    }
    if (device.status != 'pending') {
        return next(new errorHandler('No pending request', 400));
    }
    device.status = accept;
    device.placeholder = placeholde;
    await User.findOneAndUpdate({ user_id }, { device_id: device.new_device_id });

    await device.save();
    tsend(device, 'Device status updated succesfully', res);
})
    
// const changeDeviceReject = catchAsyncError(async function (req, res, next) {

//     const { user_id } = req.body;
//     const device = await Device.findOne({ user_id });
//     if (!device) {
//         return next(new errorHandler('Device not found', 404));
//     }
//     if (device.status != 'pending') {
//         return next(new errorHandler('No pending request', 400));
//     }
//     device.status = 'rejected';
//     device.updated_at = Date.now();
//     await device.save();
//     tsend(device, 'Device change request rejected', res);
// }
    
const changeDeviceHistory = catchAsyncError(async function (req, res, next) {
    const { user_id } = req.body;
    const device = await Device.findOne({ user_id });
    if (!device) {
        return next(new errorHandler('Device not found', 404));
    }
    tsend(device.history, 'Device change history', res);
})
    
const changeDeviceCurrent = catchAsyncError(async function (req, res, next) {
    const { user_id } = req.body;
    const device = await Device.findOne({ user_id });
    if (!device) {
        return next(new errorHandler('Device not found', 404));
    }
    tsend(device, 'Current device', res);
})


const isDeviceChanged = catchAsyncError(async function (req, res, next) {
    const { user_id } = req.body;
    const device = await Device.findOne({ user_id }).select('-history');
    if (!device) {
        return next(new errorHandler('Device not found', 404));
    }
   
    return tsend(device, '', res);
    // if (device.status == 'pending') {
    //     return tsend({
    //         is_device_changed: false,
    //         device_id: device.new_device_id
    //     },message, res);

    // }

    // if (device.status == 'accepted') {
    //     return tsend({
    //         is_device_changed: true,
    //         message: 'Device change request accepted',
    //         device
    //     }, 'Device change request accepted', res);
    // }

    // if (device.status == 'rejected') {
    //     return tsend({
    //         is_device_changed: false,
    //         message: 'Device change request rejected',
    //         device
    //     }, 'Device change request rejected', res);
 
    })    
    
module.exports = {
    changeDeviceRequest,
    changeStatus,
    changeDeviceHistory,
    isDeviceChanged
}
