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
    <div className="consult-simple">
      <h1 className="consult-title-simple">Select Professional</h1>
      <div className="prof-simple">
        {doctors.map((doctor) => (
          <div
            className="details-simple"
            key={doctor._id}
            onClick={() => navigate(`/consult/${doctor._id}`)}
          >
            <div className="image-container-simple">
              <img src={doctor.image || 'default-image-url.png'} alt={doctor.name} />
            </div>
            <div className="info-simple">
              <p className="name-simple">{doctor.name}</p>
              <p className="hospital-simple">{doctor.hospital}</p>
              <p className="hospital-simple">{doctor.years}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Consult;