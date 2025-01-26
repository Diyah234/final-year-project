import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../Context";
import ListReminder from "./Listreminder";

const Reminder = () => {
  const { email, name, showReminders,setShowReminders  } = useContext(AppContext); // Access email and name from context
  const [formData, setFormData] = useState({
    email: email || "", // Pre-fill email from context
    drugName: "",
    days: [], // Array to hold selected days
    times: [],
    ampm: "AM", // Default value for AM/PM
  });

  useEffect(() => {
    // Update email in formData when context email changes
    setFormData((prevFormData) => ({
      ...prevFormData,
      email,
    }));
  }, [email]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
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
      await axios.post("http://localhost:4000/api/reminders", formData);
      alert("Reminder set successfully!");
    } catch (error) {
      console.error("Failed to set reminder", error);
    }
  };

  return (
    <div>
      <h1>Set Your Reminder</h1>
      <p>Welcome, {name}!</p>
      <form onSubmit={handleSubmit}>
        {/* Display email directly */}
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled // Prevent editing the email
          />
        </label>
        <br />
        <label>
          Drug Name:
          <input
            type="text"
            name="drugName"
            value={formData.drugName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Time:
          <input
            type="time"
            name="times"
            value={formData.times}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          AM / PM:
          <input
            type="radio"
            name="ampm"
            value="AM"
            checked={formData.ampm === "AM"}
            onChange={handleChange}
          />
          AM
          <input
            type="radio"
            name="ampm"
            value="PM"
            checked={formData.ampm === "PM"}
            onChange={handleChange}
          />
          PM
        </label>
        <br />
        <label>Select Days:</label>
        <br />
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
          <label key={day}>
            <input
              type="checkbox"
              name="days"
              value={day}
              checked={formData.days.includes(day)}
              onChange={handleChange}
            />
            {day}
          </label>
        ))}
        <br />
        <button type="submit">Set Reminder</button>
      </form>
      <p onClick={()=> setShowReminders(true)}>check reminders?</p>
      {showReminders && (
        <ListReminder/>
      )}
    </div>
  );
};

export default Reminder;
