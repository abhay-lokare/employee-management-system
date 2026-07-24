import { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import "../../styles/Leave.css";
import "../../styles/EmployeeForm.css";
import { getEmployees } from "../../services/employeeService";
import { createLeaveRequest, deleteLeaveRequest, getLeaveRequests, updateLeaveRequest } from "../../services/leaveService";

function Leave() {
    const [leaves, setLeaves] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        employeeId: "",
        leaveType: "Casual Leave",
        fromDate: "",
        toDate: "",
        reason: ""
    });

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            setError("");
            const [leavesResponse, employeesResponse] = await Promise.all([
                getLeaveRequests(),
                getEmployees(0, 1000)
            ]);
            setLeaves(leavesResponse.data);
            setEmployees(employeesResponse.data.content || []);
        } catch (requestError) {
            console.error(requestError);
            setError("Unable to load leave requests. Ensure the backend is running.");
        }
    }

    function handleChange(event) {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (form.toDate < form.fromDate) {
            setError("End date cannot be before start date.");
            return;
        }

        try {
            setError("");
            await createLeaveRequest({ ...form, employeeId: Number(form.employeeId) });
            setForm({ employeeId: "", leaveType: "Casual Leave", fromDate: "", toDate: "", reason: "" });
            setShowForm(false);
            await loadData();
        } catch (requestError) {
            console.error(requestError);
            setError("Unable to submit leave request.");
        }
    }

    async function handleStatusChange(leave, status) {
        try {
            await updateLeaveRequest(leave.id, { ...leave, status });
            await loadData();
        } catch (requestError) {
            console.error(requestError);
            setError("Unable to update leave status.");
        }
    }

    async function handleDelete(id) {
        try {
            await deleteLeaveRequest(id);
            await loadData();
            toast.success("Leave request deleted successfully.");
        } catch (requestError) {
            console.error(requestError);
            setError("Unable to delete leave request.");
            toast.error("Unable to delete leave request.");
        }
    }

    const filteredLeaves = leaves.filter((leave) => {
        const keyword = search.trim().toLowerCase();
        const matchesSearch = leave.employeeName.toLowerCase().includes(keyword) || leave.department.toLowerCase().includes(keyword);
        const matchesType = typeFilter === "All" || leave.leaveType === typeFilter;
        const matchesStatus = statusFilter === "All" || leave.status === statusFilter;
        return matchesSearch && matchesType && matchesStatus;
    });

    const approved = leaves.filter((leave) => leave.status === "Approved").length;
    const pending = leaves.filter((leave) => leave.status === "Pending").length;
    const rejected = leaves.filter((leave) => leave.status === "Rejected").length;

    return (
        <div className="leave-page">
            <div className="leave-header">
                <div>
                    <h2>Leave Management</h2>
                    <p>Create and manage employee leave requests.</p>
                </div>

                <button className="leave-btn" onClick={() => setShowForm(!showForm)}>
                    <FaPlus />
                    <span>{showForm ? "Close Form" : "Apply Leave"}</span>
                </button>
            </div>

            {showForm && (
                <form className="leave-form-card" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Employee</label>
                            <select name="employeeId" value={form.employeeId} onChange={handleChange} required>
                                <option value="">Select employee</option>
                                {employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName} — {employee.department}</option>)}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Leave Type</label>
                            <select name="leaveType" value={form.leaveType} onChange={handleChange}>
                                <option>Casual Leave</option>
                                <option>Sick Leave</option>
                                <option>Earned Leave</option>
                            </select>
                        </div>

                        <div className="form-group"><label>From</label><input type="date" name="fromDate" value={form.fromDate} onChange={handleChange} required /></div>
                        <div className="form-group"><label>To</label><input type="date" name="toDate" value={form.toDate} onChange={handleChange} required /></div>
                        <div className="form-group full-width"><label>Reason</label><textarea name="reason" value={form.reason} onChange={handleChange} rows="4" required /></div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>Cancel</button>
                        <button type="submit" className="primary-btn">Submit Request</button>
                    </div>
                </form>
            )}

            <div className="leave-stats">
                <div className="leave-card"><h3>{leaves.length}</h3><span>Total Requests</span></div>
                <div className="leave-card"><h3>{approved}</h3><span>Approved</span></div>
                <div className="leave-card"><h3>{pending}</h3><span>Pending</span></div>
                <div className="leave-card"><h3>{rejected}</h3><span>Rejected</span></div>
            </div>

            <div className="leave-toolbar">
                <div className="leave-search"><FaSearch /><input type="text" placeholder="Search employee or department..." value={search} onChange={(event) => setSearch(event.target.value)} /></div>
                <div className="leave-filters">
                    <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}><option value="All">All Leave Types</option><option>Casual Leave</option><option>Sick Leave</option><option>Earned Leave</option></select>
                    <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="All">All Status</option><option>Approved</option><option>Pending</option><option>Rejected</option></select>
                </div>
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="leave-table-card">
                <table className="leave-table">
                    <thead><tr><th>Employee</th><th>Leave Type</th><th>From</th><th>To</th><th>Days</th><th>Reason</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        {filteredLeaves.map((leave) => (
                            <tr key={leave.id}>
                                <td><div className="leave-employee"><div className="leave-avatar">{leave.employeeName.charAt(0)}</div><div className="leave-info"><h6>{leave.employeeName}</h6><span>{leave.employeeEmail}</span></div></div></td>
                                <td>{leave.leaveType}</td><td>{leave.fromDate}</td><td>{leave.toDate}</td><td>{leave.days}</td><td>{leave.reason}</td>
                                <td><select value={leave.status} onChange={(event) => handleStatusChange(leave, event.target.value)}><option>Pending</option><option>Approved</option><option>Rejected</option></select></td>
                                <td><button className="delete-btn" aria-label={`Delete leave request for ${leave.employeeName}`} onClick={() => handleDelete(leave.id)}><FaTrash /></button></td>
                            </tr>
                        ))}
                        {!error && filteredLeaves.length === 0 && <tr><td colSpan="8">No leave requests found.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Leave;
