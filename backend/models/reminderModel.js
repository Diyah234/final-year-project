const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    email:{
        type: String,
        require: true
    },
    drugName:{ 
        type: String, 
        required: true 
    },
    days:{ type: [String] }, 
    times: { type: [String] },
    ampm: {type: [String]},
    lastSent: Date
})

const reminderModel = mongoose.model('reminders', reminderSchema);

module.exports = reminderModel