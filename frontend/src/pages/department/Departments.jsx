import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit, FaPlus, FaSearch, FaTrash } from "react-icons/fa";

import { deleteDepartment, getDepartments } from "../../services/departmentService";
import "../../styles/Departments.css";

function Departments() {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        loadDepartments();
    }, []);

    async function loadDepartments() {
        try {
            setError("");
            const response = await getDepartments();
            setDepartments(response.data);
        } catch (requestError) {
            console.error(requestError);
            setError("Unable to load departments. Ensure the backend is running.");
        }
    }

    async function handleDelete(id) {
        try {
            await deleteDepartment(id);
            await loadDepartments();
            toast.success("Department deleted successfully.");
        } catch (requestError) {
            console.error(requestError);
            setError("Unable to delete the department.");
            toast.error("Unable to delete department.");
        }
    }

    const normalizedSearch = search.trim().toLowerCase();
    const filteredDepartments = departments.filter((department) =>
        department.departmentName.toLowerCase().includes(normalizedSearch) ||
        department.departmentCode.toLowerCase().includes(normalizedSearch)
    );

    return (
        <div className="departments-page">
            <div className="department-header">
                <div>
                    <h2>Departments</h2>
                    <p>Manage all company departments.</p>
                </div>

                <button className="add-department-btn" onClick={() => navigate("/add-department")}>
                    <FaPlus />
                    <span>Add Department</span>
                </button>
            </div>

            <div className="department-stats">
                <div className="department-stat-card">
                    <h3>{departments.length}</h3>
                    <span>Total Departments</span>
                </div>
            </div>

            <div className="department-search">
                <div className="department-search-box">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search by name or code..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="department-table-card">
                <table className="department-table">
                    <thead>
                    <tr>
                        <th>Department</th>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredDepartments.map((department) => (
                        <tr key={department.id}>
                            <td>
                                <div className="department-name">
                                    <div className="department-avatar">
                                        {department.departmentName.charAt(0).toUpperCase()}
                                    </div>
                                    <span>{department.departmentName}</span>
                                </div>
                            </td>
                            <td>{department.departmentCode}</td>
                            <td>{department.description || "-"}</td>
                            <td>
                                <div className="department-actions">
                                    <button
                                        className="edit-btn"
                                        aria-label={`Edit ${department.departmentName}`}
                                        onClick={() => navigate(`/edit-department?id=${department.id}`)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="delete-btn"
                                        aria-label={`Delete ${department.departmentName}`}
                                        onClick={() => handleDelete(department.id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {!error && filteredDepartments.length === 0 && (
                        <tr>
                            <td colSpan="4">No departments found.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Departments;
