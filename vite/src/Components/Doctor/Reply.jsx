import { useContext, useState } from 'react';
import { AppContext } from "../Context";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios"
import "./Reply.scss"

const Reply = () => {
    const { showAppointment, setShowAppointment, consultations, docName, doctorId } = useContext(AppContext); // Get doctorId from context
    const { id } = useParams();
    const url = "http://localhost:4000/api/reply/send";
    const consultation = consultations.find(consult => consult._id === id);
    const navigate = useNavigate();

    console.log('Reply Component Rendered');
    console.log('Consultation ID:', id);
    console.log('Found Consultation:', consultation);
   
    

    if (!consultation) {
        return <p>Consultation not found.</p>;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formData, setFormData] = useState({
        message: '',
        appointmentDate: '',
        hospital: ''
    });
    console.log('Initial Form Data:', formData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        console.log('Form Data Changed:', { name, value });
        console.log('Current Form Data:', formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submit Button Clicked');
        console.log('Current Form Data on Submit:', formData);

        try {
            // Use doctorId from the context
            const replyData = {
                doctorId: doctorId,
                patientName: consultation.patientName,
                patientEmail: consultation.patientEmail,
                doctorName: docName,
                 doctorEmail: consultation.doctorEmail,
                message: formData.message,
                ...(showAppointment && {
                    appointmentDate: formData.appointmentDate,
                    hospital: formData.hospital
                })
            };
            console.log('Data being sent to backend:', replyData);
            await axios.post(url, replyData);
            console.log('Reply sent successfully');
            navigate('/success');
        } catch (error) {
            console.error('Error sending reply:', error);
        }
    };


    return (
        <div className="reply-container">
            <h1>Fill Message Box</h1>
            <p>Patient name: <span>{consultation.patientName}</span></p>
            <p>Patient Email: <span>{consultation.patientEmail}</span></p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" onChange={handleChange} value={formData.message}></textarea>

                <p className="emergency-link" onClick={() => setShowAppointment(prev => !prev)}>Emergency?</p>

                {showAppointment && <div className="appointment-section">
                    <h2>Appointment Booking</h2>

                    <label htmlFor="appointmentDate">Date: </label>
                    <input type="date" name="appointmentDate" id="appointmentDate" onChange={handleChange} value={formData.appointmentDate} /><br />

                    <label htmlFor="hospital">Hospital:</label>
                    <input type="text" onChange={handleChange} value={formData.hospital} name='hospital' id="hospital" /><br />
                </div>}

                <button type='submit' className="send-button">Send</button>
            </form>
        </div>
    );
};

export default Reply