import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.scss";
import { AppContext } from "../Context";

const Login = () => {
  const [password, setPassword] = useState("");
  const { setLogged, setEmail, email } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const url = "http://localhost:4000/api/user/login";
    try {
      const response = await axios.post(url, { email, password });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token); // Store token
        return { success: true, email: response.data.email }; // Return success
      } else {
        return { success: false, message: "Login failed. Please try again." };
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      return { success: false, message: "An error occurred. Please try again." };
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const result = await handleLogin(email, password);
    if (result.success) {
      setEmail(result.email);
      setLogged(true);
      navigate("/");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={onSubmitHandler}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
      <p>
        Don&apos;t have an account? <span>Sign Up</span>
      </p>
    </div>
  );
};

export default Login;
