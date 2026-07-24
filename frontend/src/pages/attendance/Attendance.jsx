import { useEffect, useState } from "react";
import { FaClipboardCheck, FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import "./Attendance.css";
import "../../styles/EmployeeForm.css";
import { getEmployees } from "../../services/employeeService";
import { createAttendance, deleteAttendance, getAttendance, updateAttendance } from "../../services/attendanceService";

function Attendance() {
    const today = new Date().toISOString().slice(0, 10);
    const [attendance, setAttendance] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        employeeId: "",
        date: today,
        status: "Present",
        checkIn: "09:00",
        checkOut: "18:00"
    });

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setError("");
            const [attendanceResponse, employeesResponse] = await Promise.all([
                getAttendance(),
                getEmployees(0, 1000)
            ]);
            setAttendance(attendanceResponse.data);
            setEmployees(employeesResponse.data.content || []);
        } catch (requestError) {
            console.error(requestError);
            setError("Unable to load attendance. Ensure the backend is running.");
        }
    }

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setError("");
            const attendanceData = {
                ...form,
                employeeId: Number(form.employeeId),
                checkIn: form.status === "Absent" || form.status === "Leave" ? null : form.checkIn,
                checkOut: form.status === "Absent" || form.status === "Leave" ? null : form.checkOut
            };

            if (editingId) {
                await updateAttendance(editingId, attendanceData);
                toast.success("Attendance updated successfully.");
            } else {
                await createAttendance(attendanceData);
                toast.success("Attendance saved successfully.");
            }

            setShowForm(false);
            setEditingId(null);
            setForm({ employeeId: "", date: today, status: "Present", checkIn: "09:00", checkOut: "18:00" });
            await loadData();
        } catch (requestError) {
            console.error(requestError);
            setError("Unable to save attendance. Each employee can only have one record per day.");
            toast.error("Unable to save attendance.");
        }
    }

    function handleEdit(record) {
        setEditingId(record.id);
        setForm({ employeeId: String(record.employeeId), date: record.date, status: record.status, checkIn: record.checkIn || "09:00", checkOut: record.checkOut || "18:00" });
        setShowForm(true);
    }

    async function handleDelete(id) {
        try {
            await deleteAttendance(id);
            await loadData();
            toast.success("Attendance deleted successfully.");
        } catch (requestError) {
            console.error(requestError);
            setError("Unable to delete attendance.");
            toast.error("Unable to delete attendance.");
        }
    }

    const filteredAttendance = attendance.filter((record) => {
        const keyword = search.trim().toLowerCase();
        return record.employeeName.toLowerCase().includes(keyword) || record.department.toLowerCase().includes(keyword);
    });

    const todayRecords = attendance.filter((record) => record.date === today);
    const presentToday = todayRecords.filter((record) => record.status === "Present").length;
    const leaveToday = todayRecords.filter((record) => record.status === "Leave").length;
    const absentToday = todayRecords.filter((record) => record.status === "Absent").length;

    return (
        <div className="attendance-page">
            <div className="attendance-header">
                <div>
                    <h2>Attendance</h2>
                    <p>Record and review employee attendance.</p>
                </div>

                <button className="attendance-btn" onClick={() => setShowForm(!showForm)}>
                    <FaClipboardCheck />
                    <span>{showForm ? "Close Form" : "Mark Attendance"}</span>
                </button>
            </div>

            {showForm && (
                <form className="employee-form-card" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Employee</label>
                            <select name="employeeId" value={form.employeeId} onChange={handleChange} required>
                                <option value="">Select employee</option>
                                {employees.map((employee) => (
                                    <option key={employee.id} value={employee.id}>
                                        {employee.firstName} {employee.lastName} — {employee.department}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Date</label>
                            <input type="date" name="date" value={form.date} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Status</label>
                            <select name="status" value={form.status} onChange={handleChange}>
                                <option>Present</option>
                                <option>Absent</option>
                                <option>Leave</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Check In</label>
                            <input type="time" name="checkIn" value={form.checkIn} onChange={handleChange} disabled={form.status !== "Present"} />
                        </div>

                        <div className="form-group">
                            <label>Check Out</label>
                            <input type="time" name="checkOut" value={form.checkOut} onChange={handleChange} disabled={form.status !== "Present"} />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="secondary-btn" onClick={() => { setShowForm(false); setEditingId(null); }}>Cancel</button>
                        <button type="submit" className="primary-btn">{editingId ? "Update Attendance" : "Save Attendance"}</button>
                    </div>
                </form>
            )}

            <div className="attendance-stats">
                <div className="attendance-card"><h3>{employees.length}</h3><span>Total Employees</span></div>
                <div className="attendance-card"><h3>{presentToday}</h3><span>Present Today</span></div>
                <div className="attendance-card"><h3>{leaveToday}</h3><span>On Leave Today</span></div>
                <div className="attendance-card"><h3>{absentToday}</h3><span>Absent Today</span></div>
            </div>

            <div className="attendance-search">
                <div className="attendance-search-box">
                    <FaSearch />
                    <input type="text" placeholder="Search employee or department..." value={search} onChange={(event) => setSearch(event.target.value)} />
                </div>
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="attendance-table-card">
                <table className="attendance-table">
                    <thead>
                        <tr><th>Employee</th><th>Department</th><th>Date</th><th>Check In</th><th>Check Out</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                    {filteredAttendance.map((record) => (
                        <tr key={record.id}>
                            <td>{record.employeeName}</td>
                            <td>{record.department}</td>
                            <td>{record.date}</td>
                            <td>{record.checkIn || "-"}</td>
                                <td>{record.checkOut || "-"}</td>
                                <td><span className={`attendance-status ${record.status.toLowerCase()}`}>{record.status}</span></td>
                                <td><button className="edit-btn" onClick={() => handleEdit(record)}><FaEdit /></button><button className="delete-btn" onClick={() => handleDelete(record.id)}><FaTrash /></button></td>
                        </tr>
                    ))}
                        {!error && filteredAttendance.length === 0 && <tr><td colSpan="7">No attendance records found.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Attendance;
