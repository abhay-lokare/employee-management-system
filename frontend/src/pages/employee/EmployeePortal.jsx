import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaCamera, FaClock, FaMoneyBillWave, FaPrint, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

import "../../styles/EmployeePortal.css";
import { getCurrentUser, logout } from "../../services/authService";
import { getEmployeePortal } from "../../services/employeePortalService";
import { createLeaveRequest } from "../../services/leaveService";
import { createAttendance, updateAttendance } from "../../services/attendanceService";
import { uploadEmployeePhoto } from "../../services/employeeService";

function EmployeePortal() {
    const navigate = useNavigate();
    const user = getCurrentUser();
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [showLeaveForm, setShowLeaveForm] = useState(false);
    const [form, setForm] = useState({ leaveType: "Casual Leave", fromDate: "", toDate: "", reason: "" });

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function loadData() {
        try {
            const response = await getEmployeePortal(user.employeeId);
            setData(response.data);
        } catch (requestError) {
            console.error(requestError);
            setError("Unable to load your employee details.");
        }
    }

    function handleLogout() { logout(); navigate("/login"); }
    function handleChange(event) { setForm({ ...form, [event.target.name]: event.target.value }); }

    async function handleLeaveSubmit(event) {
        event.preventDefault();
        if (form.toDate < form.fromDate) { setError("End date cannot be before start date."); return; }
        try {
            await createLeaveRequest({ ...form, employeeId: user.employeeId });
            setForm({ leaveType: "Casual Leave", fromDate: "", toDate: "", reason: "" });
            setShowLeaveForm(false);
            toast.success("Leave request submitted.");
            await loadData();
        } catch (requestError) { console.error(requestError); setError("Unable to submit leave request."); }
    }

    async function handleAttendance() {
        const today = new Date().toISOString().slice(0, 10);
        const currentTime = new Date().toTimeString().slice(0, 5);
        const todayRecord = data.attendance.find((record) => record.date === today);

        try {
            if (!todayRecord) {
                await createAttendance({ employeeId: user.employeeId, date: today, status: "Present", checkIn: currentTime, checkOut: null });
                toast.success("Check-in recorded successfully.");
            } else if (!todayRecord.checkOut) {
                await updateAttendance(todayRecord.id, { ...todayRecord, checkOut: currentTime });
                toast.success("Check-out recorded successfully.");
            }
            await loadData();
        } catch (requestError) { console.error(requestError); setError("Unable to update attendance."); }
    }

    async function handlePhotoUpload(event) {
        const photoFile = event.target.files[0];
        if (!photoFile) return;
        try {
            const response = await uploadEmployeePhoto(user.employeeId, photoFile);
            setData({ ...data, employee: response.data });
            toast.success("Profile photo updated.");
        } catch (requestError) {
            console.error(requestError);
            setError(requestError.response?.data?.message || "Unable to upload profile photo.");
        }
    }

    function printSalarySlip() {
        const payroll = data.payroll[0];
        if (!payroll) { toast.error("No payroll record is available to print."); return; }

        const printWindow = window.open("", "_blank");
        printWindow.document.write(`<html><head><title>Salary Slip</title><style>body{font-family:Arial;padding:40px;color:#111}h1{color:#2563eb}table{width:100%;border-collapse:collapse;margin-top:25px}td,th{border:1px solid #ccc;padding:12px;text-align:left}</style></head><body><h1>EMS Pro - Salary Slip</h1><p><strong>Employee:</strong> ${data.employee.firstName} ${data.employee.lastName}</p><p><strong>Employee ID:</strong> EMP${data.employee.id}</p><p><strong>Department:</strong> ${data.employee.department}</p><p><strong>Payroll Month:</strong> ${payroll.payrollMonth}</p><table><tr><th>Base Salary</th><th>Bonus</th><th>Deduction</th><th>Net Salary</th></tr><tr><td>Rs. ${payroll.baseSalary}</td><td>Rs. ${payroll.bonus}</td><td>Rs. ${payroll.deduction}</td><td>Rs. ${payroll.netSalary}</td></tr></table></body></html>`);
        printWindow.document.close();
        printWindow.print();
    }

    if (!data) return <div className="employee-portal-loading">{error || "Loading your employee portal..."}</div>;

    const employee = data.employee;
    const latestPayroll = data.payroll[0];
    const today = new Date().toISOString().slice(0, 10);
    const todayAttendance = data.attendance.find((record) => record.date === today);
    const attendanceButtonText = !todayAttendance ? "Check In" : !todayAttendance.checkOut ? "Check Out" : "Attendance Complete";
    const leaveUpdates = data.leaves.filter((leave) => leave.status !== "Pending");

    return (
        <div className="employee-portal-page">
            <header className="employee-portal-header"><div className="portal-logo">EMS Pro</div><div><span>{user.name}</span><button onClick={handleLogout}><FaSignOutAlt /> Logout</button></div></header>
            <main className="employee-portal-content">
                <section className="employee-welcome"><div className="employee-photo">{employee.photo ? <img src={employee.photo} alt={`${employee.firstName} profile`} /> : <FaUserCircle />}<label className="photo-upload"><FaCamera /><input type="file" accept="image/*" onChange={handlePhotoUpload} /></label></div><div><p>Employee Portal</p><h1>Welcome, {employee.firstName}!</h1><span>{employee.designation} - {employee.department}</span></div></section>
                {error && <p className="form-error">{error}</p>}
                <section className="employee-profile-grid">
                    <div className="portal-card profile-card"><h2>Personal Details</h2><div className="profile-details"><p><span>Employee ID</span>EMP{employee.id}</p><p><span>Full Name</span>{employee.firstName} {employee.lastName}</p><p><span>Email</span>{employee.email}</p><p><span>Phone</span>{employee.phone}</p><p><span>Joining Date</span>{employee.joiningDate || "Not available"}</p><p><span>Status</span>{employee.status}</p></div></div>
                    <div className="portal-card salary-card"><FaMoneyBillWave /><p>Latest Net Salary</p><h2>{latestPayroll ? `Rs. ${latestPayroll.netSalary}` : `Rs. ${employee.salary}`}</h2><span>{latestPayroll ? `Payroll month: ${latestPayroll.payrollMonth}` : "Base monthly salary"}</span>{latestPayroll && <button className="portal-small-btn" onClick={printSalarySlip}><FaPrint /> Print Salary Slip</button>}</div>
                    <div className="portal-card attendance-card"><FaClock /><p>Today's Attendance</p><h2>{todayAttendance?.checkIn || "Not marked"}</h2><button className="portal-small-btn" onClick={handleAttendance} disabled={Boolean(todayAttendance?.checkOut)}>{attendanceButtonText}</button></div>
                </section>
                <section className="leave-update-card"><FaCalendarAlt /><div><h3>Leave Status Updates</h3><p>{leaveUpdates.length === 0 ? "No approved or rejected leave updates yet." : `${leaveUpdates.length} leave request(s) approved or rejected. Check the status below.`}</p></div></section>
                <section className="portal-card portal-section"><div className="portal-section-header"><div><h2><FaCalendarAlt /> Leave Requests</h2><p>Apply for leave and view its approval status.</p></div><button className="portal-primary-btn" onClick={() => setShowLeaveForm(!showLeaveForm)}>{showLeaveForm ? "Close" : "Apply Leave"}</button></div>
                    {showLeaveForm && <form className="employee-leave-form" onSubmit={handleLeaveSubmit}><select name="leaveType" value={form.leaveType} onChange={handleChange}><option>Casual Leave</option><option>Sick Leave</option><option>Earned Leave</option></select><input type="date" name="fromDate" value={form.fromDate} onChange={handleChange} required /><input type="date" name="toDate" value={form.toDate} onChange={handleChange} required /><textarea name="reason" value={form.reason} onChange={handleChange} placeholder="Reason for leave" required /><button className="portal-primary-btn" type="submit">Submit Request</button></form>}
                    <div className="portal-table-wrap"><table><thead><tr><th>Type</th><th>From</th><th>To</th><th>Days</th><th>Status</th></tr></thead><tbody>{data.leaves.map((leave) => <tr key={leave.id}><td>{leave.leaveType}</td><td>{leave.fromDate}</td><td>{leave.toDate}</td><td>{leave.days}</td><td><span className={`portal-status ${leave.status.toLowerCase()}`}>{leave.status}</span></td></tr>)}{data.leaves.length === 0 && <tr><td colSpan="5">No leave requests yet.</td></tr>}</tbody></table></div>
                </section>
                <section className="portal-card portal-section"><h2><FaClock /> Attendance Details</h2><div className="portal-table-wrap"><table><thead><tr><th>Date</th><th>Status</th><th>Check In</th><th>Check Out</th></tr></thead><tbody>{data.attendance.map((record) => <tr key={record.id}><td>{record.date}</td><td>{record.status}</td><td>{record.checkIn || "-"}</td><td>{record.checkOut || "-"}</td></tr>)}{data.attendance.length === 0 && <tr><td colSpan="4">No attendance records yet.</td></tr>}</tbody></table></div></section>
                <section className="portal-card portal-section"><h2><FaMoneyBillWave /> Salary Details</h2><div className="portal-table-wrap"><table><thead><tr><th>Month</th><th>Base Salary</th><th>Bonus</th><th>Deduction</th><th>Net Salary</th></tr></thead><tbody>{data.payroll.map((record) => <tr key={record.id}><td>{record.payrollMonth}</td><td>Rs. {record.baseSalary}</td><td>Rs. {record.bonus}</td><td>Rs. {record.deduction}</td><td>Rs. {record.netSalary}</td></tr>)}{data.payroll.length === 0 && <tr><td colSpan="5">No payroll records yet.</td></tr>}</tbody></table></div></section>
            </main>
        </div>
    );
}

export default EmployeePortal;
