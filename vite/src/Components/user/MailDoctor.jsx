import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './mailDoctor.scss';
import axios from 'axios';

const MailDoctor = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const [doctor, setDoctor] = useState(null);
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    bloodGroup: '',
    hasMedicalConditions: false,
    medicalConditionDetails: '',
    allergies: '',
    consultationReason: '',
    additionalInfo: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/doctor/${id}`);
        setDoctor(response.data.data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // For checkboxes, use the checked property; for other inputs, use value
    const inputValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({ ...prevData, [name]: inputValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { 
        ...formData, 
        doctorId: id,
        doctorEmail: doctor.email // Include doctor's email for notification
      };
      await axios.post('http://localhost:4000/api/consult/send', payload);
      alert('Your consultation request was sent successfully!');
      navigate('/success'); // Navigate to another page after submission
    } catch (error) {
      console.error('Error sending the consultation request:', error);
      alert('Failed to send consultation request. Please try again.');
    }
  };

  if (!doctor) {
    return <p>Loading doctor details...</p>;
  }

  return (
    <div className="mail-doctor">
      <h2>Request Consultation</h2>
      <div className="doctor-info">
        <img src={`http://localhost:4000/uploads/${doctor.image}`} alt={doctor.name} />
        <p><strong>Name:</strong> {doctor.name}</p>
        <p><strong>Email:</strong> {doctor.email}</p>
        <p><strong>Hospital:</strong> {doctor.hospital}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <h3>Consultation Form</h3>

        <label>
          Your Full Name:
          <input 
            type="text" 
            name="patientName" 
            value={formData.patientName} 
            onChange={handleChange} 
            placeholder="Enter your full name" 
            required 
          />
        </label>
        <label>
          Your Email:
          <input 
            type="text" 
            name="patientEmail" 
            value={formData.patientEmail} 
            onChange={handleChange} 
            placeholder="Enter your email" 
            required 
          />
        </label>

        <label>
          Blood Group:
          <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </label>

        <label className="checkbox-label">
          Do you have any existing medical conditions?
          <input 
            type="checkbox" 
            name="hasMedicalConditions" 
            checked={formData.hasMedicalConditions} 
            onChange={handleChange}
          />
        </label>

        {formData.hasMedicalConditions && (
          <label>
            Medical Condition Details:
            <textarea 
              name="medicalConditionDetails" 
              value={formData.medicalConditionDetails} 
              onChange={handleChange} 
              placeholder="Please describe your medical conditions"
            ></textarea>
          </label>
        )}

        <label>
          Allergies (if any):
          <textarea 
            name="allergies" 
            value={formData.allergies} 
            onChange={handleChange} 
            placeholder="List any allergies you have"
          ></textarea>
        </label>

        <label>
          Reason for Consultation:
          <textarea 
            name="consultationReason" 
            value={formData.consultationReason} 
            onChange={handleChange} 
            placeholder="Explain why you want to consult with the doctor" 
            required
          ></textarea>
        </label>

        <label>
          Additional Information:
          <textarea 
            name="additionalInfo" 
            value={formData.additionalInfo} 
            onChange={handleChange} 
            placeholder="Provide any additional information or concerns here"
          ></textarea>
        </label>

        <button type="submit">Send Consultation Request</button>
      </form>
    </div>
  );
};

export default MailDoctor;