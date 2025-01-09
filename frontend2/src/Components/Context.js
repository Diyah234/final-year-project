import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken'


export const AppContext = createContext()

export const Context = ({children}) => {
    const [pop, setpop]= useState(false)
    const [logged, setLogged] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState("");  // Name fetched from the database

    const fetchUserInfo = async (token) => {
      try {
        const decodedToken = jwt.decode(token); // Decode the token to get user ID
        const userId = decodedToken.id;
  
        const response = await axios.get(`http://localhost:4000/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = response.data.data;
  
        if (data.name) setName(data.name); // Set name from database
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        fetchUserInfo(token);
      }
    }, []);
  
    return (
    <AppContext.Provider value={{pop,setpop, logged, setLogged , email, setEmail,name}}>
        {children}
    </AppContext.Provider>
  )
}
