const express = require('express');
const Reminder = require('../models/reminderModel'); // Import the Reminder model
const { checkAndSendReminders } = require('../controllers/reminderController');  // Controller for checking/reminding

const reminderRouter = express.Router();

// POST route to create a new reminder
reminderRouter.post('/', async (req, res) => {
  try {
    // Destructure data from the request body
    const { email, drugName, times, days, date } = req.body;

    // Create a new reminder instance with the data
    const newReminder = new Reminder({
      email,
      drugName,
      times,
      days,
      date  // optional
    });

    // Save the new reminder to the database
    await newReminder.save();

    // Send response with the created reminder
    res.status(201).json(newReminder);  // Respond with the newly created reminder
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Optionally, use the reminder check and email sending controller to handle the cron job logic
reminderRouter.get('/check-reminders', async (req, res) => {
  try {
    await checkAndSendReminders();  // Calls the function to check reminders and send emails
    res.status(200).json({ message: 'Reminder check completed.' });
  } catch (err) {
    res.status(500).json({ message: 'Error checking reminders: ' + err.message });
  }
});

module.exports = reminderRouter;
