const consultModel = require('../models/consultModel');
const nodemailer = require('nodemailer');
require('dotenv').config();

const createConsult = async (req, res) => {
  const {
    doctorId, 
    patientName, 
    patientEmail,
    bloodGroup, 
    hasMedicalConditions,
    medicalConditionDetails, 
    allergies,
    consultationReason, 
    additionalInfo, 
    doctorEmail  // We'll now store this in the consultation record
  } = req.body;

  try {
    // Create a new consultation entry with doctorEmail included
    const newConsult = new consultModel({
      doctorId,
      doctorEmail,  // Add the doctor's email to the record
      patientName,
      patientEmail,
      bloodGroup,
      hasMedicalConditions,
      medicalConditionDetails,
      allergies,
      consultationReason,
      additionalInfo
    });

    await newConsult.save();
    
    // Send email notification to doctor
    await sendConsultationEmail(doctorEmail, patientName, bloodGroup, consultationReason);
    
    res.status(201).json({
      success: true,
      message: 'Consultation request sent successfully',
      data: newConsult
    });
  } catch (err) {
    console.error('Error creating consultation:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create consultation', 
      error: err.message 
    });
  }
};

async function sendConsultationEmail(email, patientName, bloodGroup, consultationReason) {
  if (!email) {
    console.error('Doctor email is missing');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: `New Consultation Request from ${patientName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #3366cc;">New Consultation Request</h2>
          <p><strong>Patient Name:</strong> ${patientName}</p>
          <p><strong>Blood Group:</strong> ${bloodGroup}</p>
          <p><strong>Reason for Consultation:</strong> ${consultationReason}</p>
          <p>Please log in to your account to view the complete consultation details.</p>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 14px;">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Email notification failed');
  }
}

const listConsultByEmail = async (req, res) => {
  const { email } = req.params;
  
  if (!email) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email is required' 
    });
  }
  
  try {
    // Now we can directly query by doctorEmail
    const consultations = await consultModel.find({ doctorEmail: email });
    
    res.status(200).json({ 
      success: true, 
      message: consultations.length ? 'Consultations retrieved successfully' : 'No consultations found', 
      data: consultations 
    });
  } catch (err) {
    console.error('Error retrieving consultations:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to retrieve consultations', 
      error: err.message 
    });
  }
};
// Temporary debugging function
const listAllConsults = async (req, res) => {
  try {
    const allConsults = await consultModel.find({});
    res.status(200).json({
      success: true,
      count: allConsults.length,
      data: allConsults
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Add this to your exports
module.exports = { createConsult, listConsultByEmail, listAllConsults };