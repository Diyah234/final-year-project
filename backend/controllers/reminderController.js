const Reminder = require('../models/reminderModel');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a new reminder
const createReminder = async (req, res) => {
  try {
    const { email, drugName, times, days, ampm } = req.body;
    const newReminder = new Reminder({ email, drugName, times, days,ampm });
    await newReminder.save();
    res.status(201).json(newReminder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List all reminders
const listReminder = async (req, res) => {
  try {
    const reminders = await Reminder.find({});
    res.json({ success: true, data: reminders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// List reminders by user email
const listRemindersByEmail = async (req, res) => {
  try {
    const { email } = req.query; // Extract email from query parameters
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const reminders = await Reminder.find({ email }); // Find reminders for the specific email
    res.json({ success: true, data: reminders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Delete a reminder
const deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: reminder });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// Check and send reminders
async function checkAndSendReminders() {
  const now = new Date();
  const currentDay = now.toLocaleString('en-US', { weekday: 'long' });
  const currentTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  // console.log(`Current Day: ${currentDay}, Current Time: ${currentTime}`);
  // console.log('Starting reminder check...');

  const reminders = await Reminder.find(); // Retrieve all reminders

  reminders.forEach(async (reminder) => {
    reminder.times.forEach(async (time) => {
      if (
        reminder.days.includes(currentDay) && // Matches recurring day
        isTimeWithinWindow(currentTime, time) && // Matches time within ±5 minutes
        (!reminder.date || new Date(reminder.date).toDateString() === now.toDateString()) // Matches specific date if provided
      ) {
        const now = new Date();
        const lastSent = reminder.lastSent ? new Date(reminder.lastSent) : null;

        // Check if an email was sent in the last 24 hours
        if (!lastSent || now - lastSent > 24 * 60 * 60 * 1000) { 
          sendReminderEmail(reminder.email, reminder.drugName);

          // Update the lastSent field in the database
          await Reminder.findByIdAndUpdate(reminder._id, { lastSent: now });
        } else {
          console.log(`Reminder for ${reminder.drugName} already sent recently.`);
        }
      }
    });
  });
}

function isTimeWithinWindow(currentTime, reminderTime) {
  const current = parseTime(currentTime);
  const reminder = parseTime(reminderTime);

  // Calculate the difference in minutes
  const diffInMinutes =
    current.hours * 60 + current.minutes - (reminder.hours * 60 + reminder.minutes);

  return diffInMinutes >= -5 && diffInMinutes <= 5; // Within ±5 minutes
}


function parseTime(timeString) {
  const [time, period] = timeString.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  return { hours, minutes };
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

// Schedule the cron job
cron.schedule('* * * * *', async () => {
  await checkAndSendReminders();
});

// Export functions
module.exports = { createReminder, listReminder, deleteReminder, listRemindersByEmail };
