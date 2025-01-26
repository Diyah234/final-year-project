import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './mailDoctor.scss'
import axios from 'axios';

const MailDoctor = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/doctor/${id}`);
        console.log(response.data)
        setDoctor(response.data.data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchDoctor();
  }, [id]);

  if (!doctor) {
    return <p>Loading doctor details...</p>;
  }

  return (
    <div className="mail-doctor">
      <h2>Contact Doctor</h2>
      <img src={`http://localhost:4000/uploads/${doctor.image}`}  />
      <p><strong>Name:</strong> {doctor.name}</p>
      <p><strong>Email:</strong> {doctor.email}</p>
      <p><strong>Hospital:</strong> {doctor.hospital}</p>
      <form>
        <h3>Send a Message</h3>
        <textarea placeholder="Type your message..." required></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default MailDoctor;
