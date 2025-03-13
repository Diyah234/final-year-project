import axios from 'axios';
import { useContext, useEffect,  } from 'react';
import { AppContext } from '../Context';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { docName, docEmail,consultations, loading } = useContext(AppContext);
  
  const navigate = useNavigate()



  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <nav>
          <div className="logo">MedAssist</div>
          <div className="user-info">
            <p>{docEmail}</p>
          </div>
        </nav>
      </header>
      
      <main className="dashboard-main">
        <h1>Welcome {docName || 'Doctor'}</h1>
        
        <section className="consultations-section">
          <h2>Your Consultations</h2>
          
          {loading ? (
            <p>Loading consultations...</p>
          ) : consultations.length > 0 ? (
            <div className="" style={{ backgroundColor: 'gray'}} >
              {consultations.map((consult) => (
                <div key={consult._id} className="consultation-card" onClick={()=> navigate(`/reply/${consult._id}`)}>
                  <h3>Patient: {consult.patientName}</h3>
                  <p><strong>Blood Group:</strong> {consult.bloodGroup}</p>
                  <p><strong>Reason:</strong> {consult.consultationReason}</p>
                  <p><strong>Date:</strong> {new Date(consult.createdAt).toLocaleDateString()}</p>
                  <button>View Details</button>
                </div>
              ))}
            </div>
          ) : (
            <p>No consultations found. When patients request consultations, they will appear here.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;