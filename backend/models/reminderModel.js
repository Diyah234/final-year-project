const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    email:{
        type: String,
        require: true,
        unique: true
    },
    drugName:{ 
        type: String, 
        required: true 
    },
    days:{ type: [String] }, 
    times: { type: [String] }
})

const reminderModel = mongoose.model('reminders', reminderSchema);

module.exports = reminderModel