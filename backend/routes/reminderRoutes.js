const express = require('express');
const Reminder = require('../models/reminderModel'); // Import the Reminder model
const { checkAndSendReminders, createReminder, listReminder, deleteReminder, listRemindersByEmail } = require('../controllers/reminderController');  // Controller for checking/reminding

const reminderRouter = express.Router();

// POST route to create a new reminder
reminderRouter.post('/', createReminder);

// Optionally, use the reminder check and email sending controller to handle the cron job logic
reminderRouter.get('/check-reminders', async (req, res) => {
  try {
    await checkAndSendReminders();  // Calls the function to check reminders and send emails
    res.status(200).json({ message: 'Reminder check completed.' });
  } catch (err) {
    res.status(500).json({ message: 'Error checking reminders: ' + err.message });
  }
});

reminderRouter.get('/list', listReminder)
reminderRouter.delete('/:id', deleteReminder)
reminderRouter.get('/user', listRemindersByEmail); 
module.exports = reminderRouter;
