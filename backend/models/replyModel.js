const mongoose = require('mongoose')

const replySchema = new mongoose.Schema({
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patientName:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    appointmentDate:{
        type: Date,
    },
    hospital:{
        type: String,
    }
})

const replyModel = mongoose.model('reply', replySchema)