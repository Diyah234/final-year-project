import React, {useState, useContext} from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./Login.scss";
import { AppContext } from '../Context';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const { setLogged} = useContext(AppContext)
  const navigate = useNavigate();

  const onSubmitHandler = async (event)=>{
    event.preventDefault()
    const url = "http://localhost:4000/api/user/login"
    try {
      // Make a POST request with Axios
      const response = await axios.post(url, { email, password });

      if (response.data.success) {
        // Store the token in localStorage or cookies
        localStorage.setItem("token", response.data.token);

        // Navigate to the home page
        navigate("/");
        setLogged(false)
      } else {
        // Show error message if login is not successful
      console.log("Login failed. Please try again.");
      }
    } catch (error) {
      // Handle request errors
      console.log("An error occurred. Please try again.", error);
    }
  };
  

  return (
    <div className='login'>
        <form onSubmit={onSubmitHandler}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
          />
        </label><br/>
            <button type='submit'>Log In</button>
        </form>
        <p>Don't have an account? <span>Sign Up</span></p>
    </div>
  )
}

export default Login