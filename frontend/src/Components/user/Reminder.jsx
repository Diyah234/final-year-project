import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../Context';

const Reminder = () => {
  const { email, name } = useContext(AppContext); // Access email and name from context
  const [formData, setFormData] = useState({
    email,        // Pre-fill email from context
    drugName: '',
    days: [],
    times: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/reminders', formData);
      alert('Reminder set successfully!');
    } catch (error) {
      console.error("Failed to set reminder", error);
    }
  };

  return (
    <div>
      <h1>Set Your Reminder</h1>
      <p>Welcome, {name}!</p>
      <form onSubmit={handleSubmit}>
        <label>Email: {email}</label>
        <br />
        <label>
          Drug Name:
          <input type="text" name="drugName" onChange={handleChange} required />
        </label>
        {/* Other form fields */}
        <button type="submit">Set Reminder</button>
      </form>
    </div>
  );
};

export default Reminder;
