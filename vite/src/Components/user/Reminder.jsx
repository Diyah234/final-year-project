import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../Context";
import ListReminder from "./Listreminder";
import "./Reminder.scss"; // Import SCSS
import { Navigate, useNavigate } from "react-router-dom";

const Reminder = () => {
  const { email, name, showReminders, setShowReminders } = useContext(AppContext); // Access email and name from context
  const [formData, setFormData] = useState({
    email: email || "", // Pre-fill email from context
    drugName: "",
    days: [], // Array to hold selected days
    times: "", // Changed to string for time input
    ampm: "AM", // Default value for AM/PM
  });
  const [loadingEmail, setLoadingEmail] = useState(true);

  const navigate = useNavigate()
  useEffect(() => {
    // Update email in formData when context email changes
    if (email) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        email,
      }));
      setLoadingEmail(false);
    } 
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
      const timeWithAMPM = `${formData.times} ${formData.ampm}`;
      await axios.post("http://localhost:4000/api/reminders", {
        ...formData,
        times: [timeWithAMPM], // Send time as an array with AM/PM
      });
      alert("Reminder set successfully!");
      navigate("/success")
      setFormData({
        email: email || "",
        drugName: "",
        days: [],
        times: "",
        ampm: "AM",
      }); // Reset form
    } catch (error) {
      console.error("Failed to set reminder", error);
      alert("Failed to set reminder. Please try again.");
    }
  };

  return (
    <div className="reminder-container">
      <h1>Set Your Reminder</h1>
      <p className="welcome-message">
        Welcome, {name || "User"}!
      </p>
      {loadingEmail ? (
        <p>Loading email...</p>
      ) : (
        <form onSubmit={handleSubmit} className="reminder-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              disabled // Prevent editing the email
            />
          </div>
          <div className="form-group">
            <label htmlFor="drugName">Drug Name:</label>
            <input
              type="text"
              id="drugName"
              name="drugName"
              value={formData.drugName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group time-group">
            <label htmlFor="times">Time:</label>
            <input
              type="time"
              id="times"
              name="times"
              value={formData.times}
              onChange={handleChange}
              required
            />
            <div className="ampm-group">
              <label>
                <input
                  type="radio"
                  name="ampm"
                  value="AM"
                  checked={formData.ampm === "AM"}
                  onChange={handleChange}
                />
                AM
              </label>
              <label>
                <input
                  type="radio"
                  name="ampm"
                  value="PM"
                  checked={formData.ampm === "PM"}
                  onChange={handleChange}
                />
                PM
              </label>
            </div>
          </div>
          <div className="form-group days-group">
            <label>Select Days:</label>
            <div className="checkbox-group">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
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
            </div>
          </div>
          <button type="submit" className="set-reminder-button">
            Set Reminder
          </button>
        </form>
      )}
      <p
        className="check-reminders-link"
        onClick={() => setShowReminders(true)}
      >
        Check reminders?
      </p>
      {showReminders && <ListReminder />}
    </div>
  );
};

export default Reminder;