import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../Context';

const ListReminder = () => {
  const { email, showReminders, setShowReminders } = useContext(AppContext); // Ensure email is accessed from AppContext
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const fetchReminders = async () => {
      if (!email) {
        alert('Email is not available');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4000/api/reminders/user?email=${email}`);
        setReminders(response.data.data);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch reminders');
      }
    };

    
    if (showReminders) {
      fetchReminders();
      
    }
  }, [showReminders, email]); // Include email in dependencies

  const deleteReminder = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/reminders/${id}`);
      setReminders(reminders.filter((reminder) => reminder._id !== id)); // Remove the deleted reminder from state
      alert('Reminder deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete reminder');
    }
  };

  return (
    <div>
      <h1>Your Reminders</h1>
      {reminders.length > 0 ? (
        <ul>
          {reminders.map((reminder) => (
            <li key={reminder._id}>
              <div>{reminder.drugName} - {reminder.days?.join(', ') || 'No days specified'}  at{' '}
              {reminder.times?.join(', ') || 'No times specified'}</div>
              <div><button onClick={() => deleteReminder(reminder._id)}>delete</button></div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reminders found</p>
      )}
      <button onClick={() => setShowReminders(false)}>Close</button>
    </div>
  );
};

export default ListReminder;
