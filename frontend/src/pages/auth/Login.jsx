import { FaEnvelope, FaLock } from "react-icons/fa";
import "../../styles/Login.css";

function Login() {

  return (

      <div className="login-page">

        <div className="login-card">

          <h1>EMS Pro</h1>

          <p>Employee Management System</p>

          <div className="input-box">

            <FaEnvelope />

            <input
                type="email"
                placeholder="Email"
            />

          </div>

          <div className="input-box">

            <FaLock />

            <input
                type="password"
                placeholder="Password"
            />

          </div>

          <button>

            Login

          </button>

        </div>

      </div>

  );

}

export default Login;