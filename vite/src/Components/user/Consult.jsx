import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './consult.scss';

const Consult = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const showDoctors = async () => {
    const url = 'http://localhost:4000/api/doctor/list';
    try {
      const response = await axios.get(url);
      setDoctors(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    showDoctors();
  }, []);

  return (
    <div className="consult">
      <h1>Select Professional</h1>
      <div className="prof">
        {doctors.map((doctor) => (
          <div
            className="details"
            key={doctor._id}
            onClick={() => navigate(`/consult/${doctor._id}`)} // Navigate to the dynamic URL
          >
            <div>
              <img src={doctor.image || 'default-image-url.png'} alt={doctor.name} />
            </div>
            <div>
              <p>{doctor.name}</p>
              <p>{doctor.hospital}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Consult;
