import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context';
import AuthPage from '../AuthPage';
import "./dashboard.scss"

const Dashboard = () => {
    const { pop, setpop, logged} = useContext(AppContext);
    const navigate = useNavigate()
  return (
    <div className='dashboard'>
       <div className={`${pop ? "show" : "hide"}`}><AuthPage /></div> 
        <header>
            <nav>
                <div>MedAssist</div>
                <div>
                    {logged ? <button onClick={() => setpop(true)}>Log in</button> : <div>user</div> }
                    
                </div>
            </nav>
        </header>
        <main>
        <h1>Welcome <span>Rodiyyah</span></h1>
        <h3>Which of these services do you want to do</h3>
        <div className='services'>
            <div onClick={()=> navigate('/medication-reminder')}>
                <h3>Medication Reminder</h3>
                <p>Get reminders to take your medication</p>
            </div>
            <div onClick={()=> navigate('/consult')}>
                <h3>Consultation and appointment booking</h3>
                <p>Consult a doctor and get your appointment booked today</p>
            </div>
        </div>
        <div>
            <h2>Daily Health Tips</h2>
            <p>eat well</p>
        </div>
        </main>
    </div>
  )
}

export default Dashboard