import { useState } from "react";
import { FaEye, FaEyeSlash, FaKey, FaLock, FaUserShield } from "react-icons/fa";
import { toast } from "react-toastify";

import "../../styles/Settings.css";
import { changePassword } from "../../services/authService";

function Settings() {
    const [form, setForm] = useState({
        username: "ADMIN001",
        adminPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [message, setMessage] = useState("");
    const [showPasswords, setShowPasswords] = useState(false);

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("");

        if (form.newPassword !== form.confirmPassword) {
            setMessage("New password and confirm password must be the same.");
            return;
        }

        try {
            await changePassword({
                username: form.username,
                adminPassword: form.adminPassword,
                newPassword: form.newPassword
            });
            setMessage("Password changed successfully.");
            toast.success("Password changed successfully.");
            setForm({ username: "ADMIN001", adminPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error) {
            console.error(error);
            const errorMessage = error.response?.data?.message || "Unable to change password.";
            setMessage(errorMessage);
            toast.error(errorMessage);
        }
    }

    return (
        <div className="settings-page">
            <div className="page-header"><h1>Settings</h1><p>Manage administrator and employee account passwords.</p></div>

            <form className="settings-card password-settings-card" onSubmit={handleSubmit}>
                <div className="settings-card-title"><FaUserShield /><div><h2>Change Password</h2><p>Use <strong>ADMIN001</strong> for your own password, or enter an employee ID such as <strong>EMP12</strong> to reset that employee’s password.</p></div></div>

                <div className="settings-form-group">
                    <label>Account Employee ID</label>
                    <div className="settings-input"><FaKey /><input name="username" value={form.username} onChange={handleChange} placeholder="ADMIN001 or EMP12" required /></div>
                </div>

                <div className="settings-form-group">
                    <label>Administrator Current Password</label>
                    <div className="settings-input"><FaLock /><input type={showPasswords ? "text" : "password"} name="adminPassword" value={form.adminPassword} onChange={handleChange} required /><button type="button" className="password-toggle" onClick={() => setShowPasswords(!showPasswords)} aria-label="Show or hide passwords">{showPasswords ? <FaEyeSlash /> : <FaEye />}</button></div>
                </div>

                <div className="settings-form-group">
                    <label>New Password</label>
                    <div className="settings-input"><FaLock /><input type={showPasswords ? "text" : "password"} name="newPassword" value={form.newPassword} onChange={handleChange} minLength="6" required /></div>
                </div>

                <div className="settings-form-group">
                    <label>Confirm New Password</label>
                    <div className="settings-input"><FaLock /><input type={showPasswords ? "text" : "password"} name="confirmPassword" value={form.confirmPassword} onChange={handleChange} minLength="6" required /></div>
                </div>

                <button className="save-btn" type="submit">Change Password</button>
                {message && <p className={`settings-message ${message.includes("successfully") ? "success" : "error"}`}>{message}</p>}
            </form>
        </div>
    );
}

export default Settings;
