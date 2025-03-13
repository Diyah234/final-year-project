import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../Context";

const Doclogin = () => {

  const [password, setPassword] = useState("");
  const { setLogged, setDocEmail, docEmail } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const url = "http://localhost:4000/api/doctor/login";
    try {
      const response = await axios.post(url, { email, password });
      console.log("Login Response:", response.data); // ✅ Log full response
  
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        return { success: true, email: response.data.email };
      } else {
        return { success: false, message: response.data.message || "Login failed. Please try again." };
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message); // ✅ Log detailed error
      return { success: false, message: "An error occurred. Please try again." };
    }
  };
  

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const result = await handleLogin(docEmail, password);
    if (result.success) {
     
      setDocEmail(result.email);
      setLogged(true);
      navigate("/Doctor");
      window.location.reload();
    } else {
      alert(result.message);
    }
  };

  return (
    <div>
      <h1>Login as a Doctor</h1>
      <form onSubmit={onSubmitHandler}>
        <label>
          Email:
          <input
            type="email"
            value={docEmail}
            onChange={(e) => setDocEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

export default Doclogin