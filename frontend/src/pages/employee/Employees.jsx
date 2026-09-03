import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
    FaUserPlus,
    FaUsers,
    FaUserCheck,
    FaSearch,
    FaEye,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import "../../styles/employees.css";

import {
    getEmployees,
    deleteEmployee
} from "../../services/employeeService";

function Employees() {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadEmployees();

    }, []);

    async function loadEmployees() {

        try {

            const response = await getEmployees(0, 100, "id", "desc");

            setEmployees(response.data.content);

        }

        catch (error) {

            console.log(error);

        }

    }

    async function handleDelete(id) {

        try {

            await deleteEmployee(id);

            loadEmployees();
            toast.success("Employee deleted successfully.");

        }

        catch (error) {

            console.log(error);
            toast.error("Unable to delete employee.");

        }

    }

    const filteredEmployees = employees.filter((employee) => {

        const keyword = search.toLowerCase();

        return (

            (employee.firstName || "").toLowerCase().includes(keyword) ||

            (employee.lastName || "").toLowerCase().includes(keyword) ||

            (employee.email || "").toLowerCase().includes(keyword) ||

            (employee.department || "").toLowerCase().includes(keyword) ||

            (employee.designation || "").toLowerCase().includes(keyword)

        );

    });

    return (

        <div className="employees-page">

            <div className="employee-header">

                <div className="employee-header-left">

                    <h2>Employees</h2>

                    <p>Manage all employees</p>

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
                        style={{ background:"#2563eb" }}
                    >
                        <FaUsers />
                    </div>

                    <div className="employee-stat-content">

                        <h3>{employees.length}</h3>

                        <p>Total Employees</p>

                    </div>

                </div>

                <div className="employee-stat-card">

                    <div
                        className="employee-stat-icon"
                        style={{ background: "#16a34a" }}
                    >
                        <FaUserCheck />
                    </div>

                    <div className="employee-stat-content">

                        <h3>
                            {
                                employees.filter(
                                    e => e.status === "Active"
                                ).length
                            }
                        </h3>

                        <p>Active Employees</p>

                    </div>

                </div>
            </div>

            <div className="employee-search-container">

                <div className="employee-search-box">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search Employee..."

                        value={search}

                        onChange={(e) =>

                            setSearch(e.target.value)

                        }

                    />

                </div>

            </div>

            <div className="employee-table-card">

                <table className="employee-table">

                    <thead>

                    <tr>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Department</th>

                        <th>Designation</th>

                        <th>Salary</th>

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

                                        </div>

                                    </div>

                                </td>

                                <td>

                                    {employee.email}

                                </td>

                                <td>

                                    {employee.department}

                                </td>

                                <td>

                                    {employee.designation}

                                </td>

                                <td>

                                    ₹ {employee.salary}

                                </td>

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

                                            onClick={() =>

                                                handleDelete(employee.id)

                                            }

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

        </div>

    );

}

export default Employees;
