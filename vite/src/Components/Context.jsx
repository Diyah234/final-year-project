import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { jwtDecode } from 'jwt-decode';

export const AppContext = createContext();

export const Context = ({ children }) => {
    const [pop, setpop] = useState(false);
    const [logged, setLogged] = useState(false);
    const [email, setEmail] = useState(localStorage.getItem('email') || '');
    const [name, setName] = useState(localStorage.getItem('name') || '');
    const [docName, setDocName] = useState(localStorage.getItem('docName') || '');
    const [docEmail, setDocEmail] = useState(localStorage.getItem('docEmail') || '');
    const [showReminders, setShowReminders] = useState(false);
    const [showAppointment, setShowAppointment] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [userType, setUserType] = useState(localStorage.getItem('userType') || '');
    const [doctorId, setDoctorId] = useState(localStorage.getItem('doctorId') || null); // Add doctorId state
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("AppContext useEffect triggered");
        const token = localStorage.getItem('token');
        console.log("Token from localStorage:", token);

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log("Decoded Token:", decodedToken);

                if (decodedToken.role === 'doctor' || decodedToken.type === 'doctor') {
                    console.log("Doctor detected, calling fetchDocInfo...");
                    setUserType('doctor');
                    localStorage.setItem('userType', 'doctor');
                    setLogged(true)
                    fetchDocInfo(token, decodedToken.id); // Pass decoded ID
                } else {
                    setUserType('user');
                    localStorage.setItem('userType', 'user');
                    setLogged(true)
                    fetchUserInfo(token, decodedToken.id); // Pass decoded ID
                }
            } catch (error) {
                console.error('Failed to decode token', error);
            }
        }

    }, []);

    const fetchUserInfo = async (token, userId) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("User API Response:", response.data); // Debugging

            if (response.data.success) {
                const data = response.data.data;
                setName(data.name);
                setEmail(data.email);

                localStorage.setItem('name', data.name);
                localStorage.setItem('email', data.email);
            }
        } catch (error) {
            console.error('Failed to fetch user info', error);
        }
    };

    const fetchDocInfo = async (token, docId) => {
        try {
            console.log("Fetching Doctor Info for ID:", docId); // Debugging

            const response = await axios.get(`http://localhost:4000/api/doctor/${docId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Doctor API Response:", response.data); // Debugging

            if (response.data.success) {
                const data = response.data.data;
                console.log("Doctor Data:", data);
                setDocName(data.name);
                setDocEmail(data.email);
                setDoctorId(data._id); // Set doctorId in state
                localStorage.setItem('docName', data.name);
                localStorage.setItem('docEmail', data.email);
                localStorage.setItem('doctorId', data._id); // Store doctorId in localStorage
                console.log("Doctor Name:", data.name, "Doctor Email:", data.email, "Doctor ID:", data._id);
            }
        } catch (error) {
            console.error('Failed to fetch doctor info', error);
        }
    };

    useEffect(() => {
        // Fetch consultations when component mounts and docEmail is available
        const fetchConsultations = async () => {
            if (docEmail) {
                try {
                    setLoading(true);
                    const response = await axios.get(`http://localhost:4000/api/consult/list/${docEmail}`);
                    if (response.data.success) {
                        setConsultations(response.data.data);
                    }
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching consultations:', error);
                    setLoading(false);
                }
            }
        };

        fetchConsultations();
    }, [docEmail]);


    return (
        <AppContext.Provider
            value={{
                pop,
                setpop,
                logged,
                setLogged,
                email,
                setEmail,
                name,
                setName,
                showReminders,
                setShowReminders,
                showAppointment,
                setShowAppointment,
                docName,
                docEmail,
                setDocName,
                setDocEmail,
                selectedDoctor,
                setSelectedDoctor,
                userType,
                consultations,
                loading,
                doctorId, // Expose doctorId in the context
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

Context.propTypes = {
    children: PropTypes.node.isRequired,
};