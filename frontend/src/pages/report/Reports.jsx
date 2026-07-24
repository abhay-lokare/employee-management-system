import { useEffect, useState } from "react";
import { FaBuilding, FaCalendarCheck, FaMoneyBillWave, FaUsers } from "react-icons/fa";

import "../../styles/Reports.css";
import { getEmployees } from "../../services/employeeService";
import { getDepartments } from "../../services/departmentService";
import { getAttendance } from "../../services/attendanceService";
import { getPayroll } from "../../services/payrollService";

function Reports() {
    const [summary, setSummary] = useState({ employees: 0, departments: 0, attendance: 0, payroll: 0 });
    const [error, setError] = useState("");

    useEffect(() => {
        loadReports();
    }, []);

    async function loadReports() {
        try {
            setError("");
            const employeesResponse = await getEmployees(0, 1000);
            const departmentsResponse = await getDepartments();
            const attendanceResponse = await getAttendance();
            const payrollResponse = await getPayroll();

            let totalPayroll = 0;
            for (const payroll of payrollResponse.data) {
                totalPayroll += payroll.netSalary;
            }

            setSummary({
                employees: employeesResponse.data.totalElements || 0,
                departments: departmentsResponse.data.length,
                attendance: attendanceResponse.data.length,
                payroll: totalPayroll
            });
        } catch (requestError) {
            console.error(requestError);
            setError("Unable to load reports. Ensure the backend is running.");
        }
    }

    const currency = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

    const reports = [
        { icon: <FaUsers />, title: "Employee Report", value: summary.employees, description: "Total employees currently registered." },
        { icon: <FaBuilding />, title: "Department Report", value: summary.departments, description: "Total active departments." },
        { icon: <FaCalendarCheck />, title: "Attendance Report", value: summary.attendance, description: "Total attendance records saved." },
        { icon: <FaMoneyBillWave />, title: "Payroll Report", value: currency.format(summary.payroll), description: "Total net payroll generated." }
    ];

    return (
        <div className="reports-page">
            <div className="page-header"><h1>Reports</h1><p>Live summary of company data.</p></div>
            {error && <p className="form-error">{error}</p>}
            <div className="reports-grid">
                {reports.map((report) => (
                    <div className="report-card" key={report.title}>
                        <div className="report-icon">{report.icon}</div>
                        <h3>{report.title}</h3>
                        <h2 className="report-value">{report.value}</h2>
                        <p>{report.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Reports;
