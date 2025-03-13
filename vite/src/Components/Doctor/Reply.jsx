import {useContext, useState} from 'react';
import  axios  from 'axios';
import { AppContext } from "../Context";
import { useParams, useNavigate } from 'react-router-dom';


const Reply = () => {
    const {showAppointment, setShowAppointment, consultations,docName } = useContext(AppContext)
     const { id } = useParams();
     const url = "http://localhost:4000/api/reply/send";
     const consultation = consultations.find(consult => consult._id === id);
    const navigate = useNavigate();
    if (!consultation) {
        return <p>Consultation not found.</p>;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formData, setFormData] = useState({
      message: '',
      appointmentDate: '',
      hospital: ''
    })
   const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev =>({
      ...prev,
      [name]: value
    }))
   }
   const handleSubmit = async (e)=>{
    e.preventDefault();

    try{
      const doctorId = localStorage.getItem('doctorId')
      const replyData = {
        doctorId: doctorId,
        patientName: consultation.patientName,
        patientEmail: consultation.patientEmail,
        doctorName: docName,
        message: formData.message,
        ...(showAppointment && {
          appointmentDate: formData.appointmentDate,
          hospital: formData.hospital
        })
      }
      await axios.post(url, replyData)
      navigate('/success')
    }catch(error){
      console.log(error)
    }
   }
   
    
  return (
    <div>
        <h1>fill message box</h1>
        <p>Patient name: <span>{consultation.patientName}</span></p>
        <p>Patient Email: <span>{consultation.patientEmail}</span></p>
        <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">Message</label><textarea name="message" id="" onChange={handleChange} value={formData.message}></textarea>
        <p onClick={()=> setShowAppointment(prev => !prev)}>Emergency?</p> 
        { showAppointment && <div>
            <h1>Appointment booking</h1>
            
                <label htmlFor="">Date: </label><input type="date" name="appointmentDate" id="" onChange={handleChange} value={formData.appointmentDate} /><br />
                <label htmlFor="">Hospital:</label> <input type="text" onChange={handleChange} value={formData.hospital} name='hospital' /><br />
            </div>}
            <button type='submit'>Send</button>
            </form>
    </div>
  )
}

export default Reply