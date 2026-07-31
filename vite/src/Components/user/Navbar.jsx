import { useContext } from "react";
import { AppContext } from "../Context";
import AuthPage from "../AuthPage";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.scss";

const Navbar = () => {
  const { pop, setpop, logged, setLogged, email, setEmail, setName } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear relevant data
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("userType");
    localStorage.removeItem("docEmail");
    localStorage.removeItem("docName");
    localStorage.removeItem("doctorId");

    // Reset context
    setLogged(false);
    setEmail("");
    setName("");

    // Optionally navigate
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className={`${pop ? "show" : "hide"}`}>
        <AuthPage />
      </div>
      <header>
        <nav>
          <h3 className="logo">MedAssist</h3>

          <div className="list">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/medication-reminder" className="nav-link">
              Reminders
            </Link>
            <Link to="/consult" className="nav-link">
              Consult
            </Link>
            {logged ? (
              <>
                <p>{email}</p>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </>
            ) : (
              <button onClick={() => setpop(true)}>Log in</button>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
