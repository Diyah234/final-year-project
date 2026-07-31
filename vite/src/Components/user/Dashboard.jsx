import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import doctor from '../../assets/doctor.png'
import DailyHealthTip from './DailyHealthTip'; 
import "./dashboard.scss";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <Navbar />
      <main>
        <div className="text">
        <p className="purple">
          {" "}
          <span className="plus">+</span>{" "}
          <span className="best">Best Healthcare</span>
        </p>
        <h1>Online Doctors <br /> A Few Clicks Away</h1>
        <p>
          MedAssist provides a One-stop Health Solution. A few clicks away! Contact a
          doctor, other healthcare professionals, or a specialist via text,
          video, or phone..
        </p>
        <div className="services">
          <div onClick={() => navigate("/medication-reminder")}>
          Set Medication Reminder
          </div>
          <div onClick={() => navigate("/consult")}>
            Consultation and Appointments
          </div>
        </div>
        <div className="tips">
         <DailyHealthTip />
        </div>
        
        </div>
        <div className="doctor">
            <img src={doctor} />
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
