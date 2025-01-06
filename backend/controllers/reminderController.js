const Reminder = require('../models/reminderModel');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
require('dotenv').config();


async function checkAndSendReminders () {
  const now = new Date();
  // now.setHours(now.getHours() + 1); // Add 1 hour for GMT+1 (Nigeria time)
  
  // Get the current day and time in Nigeria
  const currentDay = now.toLocaleString('en-US', { weekday: 'long' });
  const currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  
  console.log(`Current Time: ${currentTime}`)
  console.log("Starting reminder check...");
  
  const reminders = await Reminder.find();
  console.log("Reminders retrieved:", reminders);

  reminders.forEach((reminder) => {
    console.log("Processing reminder:", reminder);
    const timesMapping = {
      Morning: '02:09 AM',
      Afternoon: '12:00',
      Evening: '18:00',
      Night: '20:00',
    };
    

    reminder.times.forEach((time) => {
      const reminderTime = timesMapping[time];
      console.log(`Current Time: ${currentTime}, Reminder Time: ${reminderTime}`);

      // Check for exact time, 5 minutes before, or 5 minutes after
      const reminderDate = reminder.date ? new Date(reminder.date).toDateString() : null;

      if (
        (!reminderDate || reminderDate === now.toDateString()) && // Matches date if provided
        reminder.days.includes(currentDay) && // Matches recurring day
        (currentTime === reminderTime || // Matches exact time
          currentTime === addMinutes(reminderTime, -5) || // Matches 5 minutes before
          currentTime === addMinutes(reminderTime, 5)) // Matches 5 minutes after
      ) {
        sendReminderEmail(reminder.email, reminder.drugName);
      }
    });
  });
};

function addMinutes(time, minutes) {
  const [hour, minute] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hour, minute + minutes);
  return date.toTimeString().slice(0, 5); // Return HH:mm
}

function sendReminderEmail(email, drugName) {
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
    subject: 'Medication Reminder',
    text: `It's time to take your medication: ${drugName}.`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('Failed to send email:', err);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

cron.schedule('* * * * *', async () => {
  console.log('Running cron job for reminders...');
  await checkAndSendReminders();
});

module.exports= { checkAndSendReminders }

