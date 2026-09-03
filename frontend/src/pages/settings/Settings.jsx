import { useState } from "react";
import { FaDownload, FaEye, FaEyeSlash, FaKey, FaLock, FaUpload, FaUserShield } from "react-icons/fa";
import { toast } from "react-toastify";

import "../../styles/Settings.css";
import { changePassword } from "../../services/authService";
import { downloadWorkbook, importWorkbook } from "../../services/workbookService";

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

    async function handleImport(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            await importWorkbook(file);
            toast.success("Excel data imported successfully. The app will now refresh.");
            setTimeout(() => window.location.reload(), 800);
        } catch (error) {
            console.error(error);
            toast.error("Unable to import this Excel workbook.");
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

            <div className="settings-card backup-settings-card">
                <div className="settings-card-title"><FaDownload /><div><h2>Excel Data Backup</h2><p>Download all EMS Pro data as an Excel workbook, or import a previously exported workbook. Browser data is stored only on this device.</p></div></div>
                <div className="backup-actions">
                    <button className="save-btn" onClick={downloadWorkbook}><FaDownload /> Export to Excel</button>
                    <label className="import-btn"><FaUpload /> Import from Excel<input type="file" accept=".xlsx,.xls" onChange={handleImport} /></label>
                </div>
            </div>
        </div>
    );
}

export default Settings;
