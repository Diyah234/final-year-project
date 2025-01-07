import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from './Context';

const ListReminder = () => {
  const { email } = useContext(AppContext); // Access email from context
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/reminders?email=${email}`);
        setReminders(response.data.data);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch reminders');
      }
    };

    if (email) {
      fetchReminders();
    }
  }, [email]);

  return (
    <div>
      <h1>Your Reminders</h1>
      <ul>
        {reminders.map((reminder) => (
          <li key={reminder._id}>
            {reminder.drugName} - {reminder.days.join(', ')} at {reminder.times.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListReminder;
