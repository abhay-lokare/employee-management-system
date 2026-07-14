import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaUserPlus,
    FaUsers,
    FaUserCheck,
    FaUserClock,
    FaSearch,
    FaFilter,
    FaEye,
    FaEdit,
    FaTrash,
    FaAngleLeft,
    FaAngleRight
} from "react-icons/fa";

import "../../styles/Employees.css";

import {
    getEmployees,
    deleteEmployee
} from "../../services/employeeService";

function Employees() {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");

    const loadEmployees = useCallback(async () => {

        try {

            const response = await getEmployees();

            setEmployees(response.data.content);

        } catch (error) {

            console.log(error);

        }

    }, []);

    useEffect(() => {

        loadEmployees();

    }, [loadEmployees]);



    async function handleDelete(id) {

        if (!window.confirm("Delete this employee?")) return;

        try {

            await deleteEmployee(id);

            loadEmployees();

        } catch (error) {

            console.log(error);

        }

    }

    const filteredEmployees = employees.filter((employee) => {

        const fullName =
            `${employee.firstName} ${employee.lastName}`.toLowerCase();

        return (
            fullName.includes(search.toLowerCase()) ||
            employee.email.toLowerCase().includes(search.toLowerCase())
        );

    });

    return (

        <div className="employees-page">

            <div className="employee-header">

                <div className="employee-header-left">

                    <h2>Employees</h2>

                    <p>Manage all employees from one place.</p>

                </div>

                <button
                    className="add-employee-btn"
                    onClick={() => navigate("/add-employee")}
                >

                    <FaUserPlus />

                    Add Employee

                </button>

            </div>

            <div className="employee-stats">

                <div className="employee-stat-card">

                    <div
                        className="employee-stat-icon"
                        style={{ background: "#4F46E5" }}
                    >

                        <FaUsers />

                    </div>

                    <h3>{employees.length}</h3>

                    <p>Total Employees</p>

                </div>

                <div className="employee-stat-card">

                    <div
                        className="employee-stat-icon"
                        style={{ background: "#22C55E" }}
                    >

                        <FaUserCheck />

                    </div>

                    <h3>
                        {
                            employees.filter(
                                e => e.status === "Active"
                            ).length
                        }
                    </h3>

                    <p>Active Employees</p>

                </div>

                <div className="employee-stat-card">

                    <div
                        className="employee-stat-icon"
                        style={{ background: "#F59E0B" }}
                    >

                        <FaUserClock />

                    </div>

                    <h3>
                        {
                            employees.filter(
                                e => e.status === "Leave"
                            ).length
                        }
                    </h3>

                    <p>On Leave</p>

                </div>

            </div>

            <div className="employee-search-container">

                <div className="employee-search-box">

                    <FaSearch />

                    <input
                        placeholder="Search employee..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <button className="filter-btn">

                    <FaFilter />

                    Filter

                </button>

            </div>

            <div className="employee-table-card">

                <table className="employee-table">

                    <thead>

                    <tr>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Department</th>

                        <th>Designation</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        filteredEmployees.map(employee => (

                            <tr key={employee.id}>

                                <td>

                                    <div className="employee-info">

                                        <div className="employee-avatar">

                                            {employee.firstName.charAt(0)}

                                        </div>

                                        <div className="employee-details">

                                            <h6>

                                                {employee.firstName} {employee.lastName}

                                            </h6>

                                            <span>

                                                {employee.email}

                                            </span>

                                        </div>

                                    </div>

                                </td>

                                <td>{employee.email}</td>

                                <td>{employee.department}</td>

                                <td>{employee.designation}</td>

                                <td>

                                    <span className={`status ${employee.status.toLowerCase()}`}>

                                        {employee.status}

                                    </span>

                                </td>

                                <td>

                                    <div className="table-actions">

                                        <button
                                            className="view-btn"
                                            onClick={() =>
                                                navigate(`/employee-details?id=${employee.id}`)
                                            }
                                        >

                                            <FaEye />

                                        </button>

                                        <button
                                            className="edit-btn"
                                            onClick={() =>
                                                navigate(`/edit-employee?id=${employee.id}`)
                                            }
                                        >

                                            <FaEdit />

                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(employee.id)}
                                        >

                                            <FaTrash />

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    }

                    </tbody>

                </table>

            </div>

            <div className="employee-pagination">

                <button className="page-btn">

                    <FaAngleLeft />

                </button>

                <button className="page-number active">

                    1

                </button>

                <button className="page-btn">

                    <FaAngleRight />

                </button>

            </div>

        </div>

    );

}

export default Employees;