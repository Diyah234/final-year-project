const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    jobTitle:{
        type: String,
        require: true
    },
    hospital:{
        type: String,
        require: true
    },
    image:{
        type: String,
        require: false
    },
})

const doctorModel = mongoose.model('doctor', doctorSchema);

module.exports = doctorModel