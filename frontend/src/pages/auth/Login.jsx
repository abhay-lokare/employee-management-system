import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaIdBadge, FaLock, FaSignInAlt, FaUsers } from "react-icons/fa";

import "../../styles/Login.css";
import { login, saveCurrentUser } from "../../services/authService";

function Login() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await login(form);
            saveCurrentUser(response.data);
            navigate(response.data.role === "ADMIN" ? "/" : "/employee-portal");
        } catch (requestError) {
            console.error(requestError);
            setError("Invalid employee ID or password.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-brand"><FaUsers /><div><h1>EMS Pro</h1><p>Employee Management System</p></div></div>
                <h2>Welcome back</h2>
                <p className="login-subtitle">Sign in using the ID and password provided by your administrator.</p>
                {error && <p className="login-error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>Employee ID</label>
                    <div className="login-input"><FaIdBadge /><input name="username" value={form.username} onChange={handleChange} placeholder="Example: EMP1" required /></div>
                    <label>Password</label>
                    <div className="login-input"><FaLock /><input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="Enter password" required /><button type="button" className="login-password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Show or hide password">{showPassword ? <FaEyeSlash /> : <FaEye />}</button></div>
                    <button className="login-button" type="submit" disabled={loading}><FaSignInAlt />{loading ? "Signing in..." : "Sign In"}</button>
                </form>
                <div className="login-help"><strong>Admin demo:</strong> ADMIN001 / Admin@123<br /><strong>New employee:</strong> EMP&lt;employee number&gt; / Emp@123</div>
            </div>
        </div>
    );
}

export default Login;
