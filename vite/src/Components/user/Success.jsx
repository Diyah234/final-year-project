import React, { useContext } from 'react';
import './Success.scss'; // Import SCSS for styling
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context'; // Assuming you have an AppContext for authentication

const Success = () => {
  const { logged } = useContext(AppContext);
  const navigate = useNavigate();

  const handleGoHome = () => {
    if (logged) {
      navigate('/'); 
    } else {
      navigate('/Userauth'); // Go to login page if not logged in
    }
    
  };

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-2.47a.75.75 0 011.06 1.06l-3.219 3.22c-.287.287-.672.43-.976.43-.304 0-.689-.143-.976-.43l-3.219-3.22a.75.75 0 011.06-1.06L11.5 12.97l2.774-2.77z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="success-title">Success!</h2>
        <p className="success-message">
          Your consultation request has been sent successfully.
        </p>
        <p className="success-message">
          The doctor will review your request and may contact you soon.
        </p>
        <div className="success-actions">
          <button onClick={handleGoHome} className="back-home-button">
            Go Back to Home
          </button>
          {/* You can add more actions here, like viewing past consultations */}
        </div>
      </div>
    </div>
  );
};

export default Success;