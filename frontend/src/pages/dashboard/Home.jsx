import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaBuilding, FaUserCheck, FaUsers } from "react-icons/fa";

import "./Home.css";
import StatCard from "../../components/dashboard/StatCard";
import { getEmployees } from "../../services/employeeService";
import { getDepartments } from "../../services/departmentService";

function Home() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        employees: 0,
        departments: 0,
        managers: 0,
        active: 0
    });
    const [error, setError] = useState("");
    const [departmentChart, setDepartmentChart] = useState([]);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const [employeesResponse, departmentsResponse] = await Promise.all([
                    getEmployees(0, 1000),
                    getDepartments()
                ]);

                const employees = employeesResponse.data.content || [];
                const departments = departmentsResponse.data || [];

                setStats({
                    employees: employeesResponse.data.totalElements ?? employees.length,
                    departments: departments.length,
                    managers: employees.filter((employee) =>
                        employee.designation?.toLowerCase().includes("manager")
                    ).length,
                    active: employees.filter((employee) => employee.status === "Active").length
                });

                setDepartmentChart(departments.map((department) => ({
                    name: department.departmentName,
                    count: employees.filter((employee) => employee.department === department.departmentName).length
                })));
            } catch (requestError) {
                console.error(requestError);
                setError("Unable to load dashboard data. Ensure the backend is running.");
            }
        }

        loadDashboard();
    }, []);

    return (
        <div className="dashboard-page">
            <div className="hero-card">
                <div className="hero-left">
                    <span className="hero-badge">Employee Management System</span>

                    <h1>Welcome back 👋</h1>

                    <p>
                        You currently manage <strong>{stats.employees} employees</strong> across <strong>{stats.departments} departments.</strong>
                    </p>

                    <div className="hero-buttons">
                        <button className="btn-primary-custom" onClick={() => navigate("/add-employee")}>+ Add Employee</button>
                        <button className="btn-secondary-custom" onClick={() => navigate("/employees")}>View Employees</button>
                    </div>

                    {error && <p className="form-error">{error}</p>}
                </div>

                <div className="hero-right">
                    <div className="stats-grid">
                        <StatCard title="Employees" subtitle="Total Employees" value={stats.employees} growth="Live data" icon={<FaUsers />} color="#4F46E5" />
                        <StatCard title="Departments" subtitle="Active Departments" value={stats.departments} growth="Live data" icon={<FaBuilding />} color="#14B8A6" />
                        <StatCard title="Managers" subtitle="Manager Designations" value={stats.managers} growth="Live data" icon={<FaBriefcase />} color="#F59E0B" />
                        <StatCard title="Active" subtitle="Currently Working" value={stats.active} growth="Live data" icon={<FaUserCheck />} color="#22C55E" />
                    </div>
                </div>
            </div>

            <section className="dashboard-chart-card">
                <div><h2>Employees by Department</h2><p>Current employee distribution across departments.</p></div>
                {departmentChart.length === 0 && <p className="chart-empty">No department data available.</p>}
                <div className="department-chart">
                    {departmentChart.map((department) => (
                        <div className="chart-row" key={department.name}>
                            <span>{department.name}</span>
                            <div className="chart-bar-background"><div className="chart-bar" style={{ width: `${stats.employees ? (department.count / stats.employees) * 100 : 0}%` }} /></div>
                            <strong>{department.count}</strong>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;
