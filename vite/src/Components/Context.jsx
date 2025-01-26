import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {jwtDecode} from 'jwt-decode'; // Corrected import (default export)

export const AppContext = createContext();

export const Context = ({ children }) => {
  const [pop, setpop] = useState(false);
  const [logged, setLogged] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [docName, setDocName] = useState('');
  const [docEmail, setDocEmail] = useState('')
  const [showReminders, setShowReminders] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const fetchUserInfo = async (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await axios.get(`http://localhost:4000/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data;

      if (data.name) setName(data.name); // Set name from database
      if (data.email) setEmail(data.email); // Set email from database if necessary
     
    } catch (error) {
      console.error('Failed to fetch user info', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo(token);
    }
  }, []);
  
  const fetchDocInfo = async (token)=>{
    try{
      const decodedToken = jwtDecode(token);
      const docId = decodedToken.id;

      const response = await axios.get(`http://localhost:4000/api/doctor/${docId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data;
      if (data.name) setName(data.docName); // Set name from database
      if (data.email) setEmail(data.docEmail); 
    }
    catch(error){
      console.error('Failed to fetch doctor info', error);
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchDocInfo(token);
    }
  }, []);
  return (
    <AppContext.Provider value={
      { pop, setpop, logged, setLogged, email, setEmail, name, showReminders, setShowReminders, docName,docEmail , selectedDoctor,
        setSelectedDoctor,}
      }>
      {children}
    </AppContext.Provider>
  );
};

Context.propTypes = {
  children: PropTypes.node.isRequired,
};
