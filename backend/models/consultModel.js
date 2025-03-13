const mongoose = require('mongoose');

const consultSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor', // Reference your Doctor collection if it exists
    required: true
  },
  doctorEmail: {
    type: String,
    required: true
  },
  patientName: {
    type: String,
    required: true
  },
  patientEmail: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  hasMedicalConditions: {
    type: Boolean,
    required: true
  },
  medicalConditionDetails: {
    type: String,
    default: '' // Optional details for medical conditions
  },
  allergies: {
    type: String,
    default: '' // Optional allergy details
  },
  consultationReason: {
    type: String,
    required: true
  },
  additionalInfo: {
    type: String,
    default: '' // Optional additional information
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const consultModel = mongoose.model('Consult', consultSchema);

module.exports = consultModel;
