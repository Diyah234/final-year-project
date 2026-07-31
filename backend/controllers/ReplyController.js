const replyModel = require('../models/replyModel')
const nodemailer = require('nodemailer');
require('dotenv').config();


const createReply = async(req,res)=>{
    const {
        doctorId,
        doctorName,
        patientEmail,
        patientName,
        message,
        appointmentDate,
        hospital
    } = req.body

    try {
         // Use replyModel.create() to create and save a new document
         const newReply = await replyModel.create({
            doctorId,
            doctorName,
            patientEmail,
            patientName,
            message,
            appointmentDate,
            hospital
        });

        await sendReplyEmail(patientEmail, doctorName, message, appointmentDate, hospital);

        res.status(201).json({
            success: true,
            message: 'Reply request sent successfully',
            data: newReply
        });
    }catch(error){
        console.log(error)
    }
}

async function sendReplyEmail(email, doctorName, message, appointmentDate,hospital){
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        })
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: `New Consultation Reply`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #3366cc;">New Consultation Request</h2>
          <p><strong>Doctor Name:</strong> ${doctorName}</p>
          <p><strong>Hospital:</strong> ${hospital}</p>
          <p><strong>Message</strong> ${message}</p>
          <p><strong>Appointment Date</strong> ${appointmentDate}</p>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 14px;">
            <p>This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>`
        }
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return info;
      } catch (error) {
        console.error('Failed to send email:', error);
        throw new Error('Email notification failed');
      }
}


module.exports = { createReply }