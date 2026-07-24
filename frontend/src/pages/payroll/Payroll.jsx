import { useEffect, useState } from "react";
import { FaEdit, FaMoneyCheckAlt, FaSearch, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

import "../../styles/Payroll.css";
import "../../styles/EmployeeForm.css";
import { getEmployees } from "../../services/employeeService";
import { createPayroll, deletePayroll, getPayroll, updatePayroll } from "../../services/payrollService";

function Payroll() {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const [records, setRecords] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState("");
    const [form, setForm] = useState({ employeeId: "", payrollMonth: currentMonth, bonus: "0", deduction: "0" });

    useEffect(() => { loadData(); }, []);

    async function loadData() {
        try {
            setError("");
            const payrollResponse = await getPayroll();
            const employeesResponse = await getEmployees(0, 1000);
            setRecords(payrollResponse.data);
            setEmployees(employeesResponse.data.content || []);
        } catch (requestError) {
            console.error(requestError);
            setError("Unable to load payroll. Ensure the backend is running.");
        }
    }

    function handleChange(event) { setForm({ ...form, [event.target.name]: event.target.value }); }

    async function handleSubmit(event) {
        event.preventDefault();
        const payrollData = { employeeId: Number(form.employeeId), payrollMonth: `${form.payrollMonth}-01`, bonus: Number(form.bonus || 0), deduction: Number(form.deduction || 0) };

        try {
            setError("");
            if (editingId) {
                await updatePayroll(editingId, payrollData);
                toast.success("Payroll updated successfully.");
            } else {
                await createPayroll(payrollData);
                toast.success("Payroll generated successfully.");
            }
            resetForm();
            await loadData();
        } catch (requestError) {
            console.error(requestError);
            setError("Unable to save payroll. A record may already exist for this employee and month.");
            toast.error("Unable to save payroll.");
        }
    }

    function resetForm() {
        setForm({ employeeId: "", payrollMonth: currentMonth, bonus: "0", deduction: "0" });
        setEditingId(null);
        setShowForm(false);
    }

    function handleEdit(record) {
        setEditingId(record.id);
        setForm({ employeeId: String(record.employeeId), payrollMonth: record.payrollMonth.slice(0, 7), bonus: String(record.bonus), deduction: String(record.deduction) });
        setShowForm(true);
    }

    async function handleDelete(id) {
        try {
            await deletePayroll(id);
            await loadData();
            toast.success("Payroll record deleted successfully.");
        } catch (requestError) {
            console.error(requestError);
            setError("Unable to delete payroll record.");
            toast.error("Unable to delete payroll record.");
        }
    }

    const filteredRecords = records.filter((record) => {
        const keyword = search.trim().toLowerCase();
        return record.employeeName.toLowerCase().includes(keyword) || record.department.toLowerCase().includes(keyword);
    });

    const currency = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount || 0);
    let totalPayroll = 0;
    let totalBonus = 0;
    for (const record of records) { totalPayroll += record.netSalary; totalBonus += record.bonus; }

    return (
        <div className="payroll-page">
            <div className="payroll-header"><div><h2>Payroll</h2><p>Generate and manage monthly payroll records.</p></div><button className="payroll-btn" onClick={() => setShowForm(!showForm)}><FaMoneyCheckAlt /><span>{showForm ? "Close Form" : "Generate Payroll"}</span></button></div>
            {showForm && <form className="employee-form-card payroll-form" onSubmit={handleSubmit}><div className="form-grid"><div className="form-group"><label>Employee</label><select name="employeeId" value={form.employeeId} onChange={handleChange} required><option value="">Select employee</option>{employees.map((employee) => <option key={employee.id} value={employee.id}>{employee.firstName} {employee.lastName} - {currency(employee.salary)}</option>)}</select></div><div className="form-group"><label>Payroll Month</label><input type="month" name="payrollMonth" value={form.payrollMonth} onChange={handleChange} required /></div><div className="form-group"><label>Bonus</label><input type="number" min="0" name="bonus" value={form.bonus} onChange={handleChange} required /></div><div className="form-group"><label>Deduction</label><input type="number" min="0" name="deduction" value={form.deduction} onChange={handleChange} required /></div></div><div className="form-actions"><button type="button" className="secondary-btn" onClick={resetForm}>Cancel</button><button type="submit" className="primary-btn">{editingId ? "Update Payroll" : "Generate Payroll"}</button></div></form>}
            <div className="payroll-stats"><div className="payroll-card"><h3>{records.length}</h3><span>Generated Records</span></div><div className="payroll-card"><h3>{currency(totalPayroll)}</h3><span>Total Net Payroll</span></div><div className="payroll-card"><h3>{currency(totalBonus)}</h3><span>Total Bonus</span></div></div>
            <div className="payroll-search"><div className="payroll-search-box"><FaSearch /><input type="text" placeholder="Search employee or department..." value={search} onChange={(event) => setSearch(event.target.value)} /></div></div>
            {error && <p className="form-error">{error}</p>}
            <div className="payroll-table-card"><table className="payroll-table"><thead><tr><th>Employee</th><th>Department</th><th>Month</th><th>Salary</th><th>Bonus</th><th>Deduction</th><th>Net Salary</th><th>Actions</th></tr></thead><tbody>{filteredRecords.map((record) => <tr key={record.id}><td>{record.employeeName}</td><td>{record.department}</td><td>{record.payrollMonth.slice(0, 7)}</td><td>{currency(record.baseSalary)}</td><td>{currency(record.bonus)}</td><td>{currency(record.deduction)}</td><td>{currency(record.netSalary)}</td><td><button className="edit-btn" onClick={() => handleEdit(record)}><FaEdit /></button><button className="delete-btn" onClick={() => handleDelete(record.id)}><FaTrash /></button></td></tr>)}{!error && filteredRecords.length === 0 && <tr><td colSpan="8">No payroll records found.</td></tr>}</tbody></table></div>
        </div>
    );
}

export default Payroll;
