

const { model, Schema } = require('mongoose');


const deviceSchema = new Schema({
    
        user_id: {
                type:String,
                required: true,
                index: true
        },
        old_device_id: String,
        new_device_id: String,
        message: String,
        status: String,// [accepted/rejected/pending],
        placeholder: String,
        created_at: Number,
        history: [{
                _id: false,
        old_device_id: String,
        new_device_id: String,
        message: String,
        status: String,
        placeholder: String,
        created_at: Number,
        }]
        

})

module.exports = model('device', deviceSchema);

