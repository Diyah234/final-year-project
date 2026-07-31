import React , { useState}from 'react';
import { Link , useNavigate} from "react-router-dom";
import axios from 'axios'
import "./Login.scss"

const Sign = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (name, email, password) => {
    const url = "http://localhost:4000/api/user/signup"; // Signup endpoint
    try {
      const response = await axios.post(url, { name, email, password });
      if (response.data.success) {
        alert("Signup successful! You can now log in.");
        navigate("/Userauth"); // Redirect to login after signup
        return { success: true };
      } else {
        return { success: false, message: response.data.message || "Signup failed. Please try again." };
      }
    } catch (error) {
      console.error("An error occurred during signup:", error);
      return { success: false, message: "An error occurred during signup. Please try again." };
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    const result = await handleSignup(name, email, password);
    if (!result.success) {
      alert(result.message);
    }
  };
  return (
    <div className="sign">
      <h1>Sign up as a Patient</h1>
      <form onSubmit={onSubmitHandler}>
        <label>
          Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <br />
        <label>
          Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        <label>
          Confirm Password: <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/Userauth">Log In</Link>
      </p>
    </div>
  )
}

export default Sign