import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaPlus,
    FaSearch,
    FaEye,
    FaEdit,
    FaTrash,
    FaAngleLeft,
    FaAngleRight
} from "react-icons/fa";

import "../../styles/Departments.css";

import {
    getDepartments,
    deleteDepartment
} from "../../services/departmentService";

function Departments() {

    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [search, setSearch] = useState("");

    const loadDepartments = useCallback(async () => {

        try {

            const response = await getDepartments();

            setDepartments(response.data);

        } catch (error) {

            console.log(error);

        }

    }, []);

    useEffect(() => {

        loadDepartments();

    }, [loadDepartments]);

    async function handleDelete(id) {

        if (!window.confirm("Delete this department?")) return;

        try {

            await deleteDepartment(id);

            loadDepartments();

        } catch (error) {

            console.log(error);

        }

    }

    const filteredDepartments = departments.filter((department) =>
        department.departmentName
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (

        <div className="departments-page">

            {/* Header */}

            <div className="department-header">

                <div>

                    <h2>Departments</h2>

                    <p>Manage all company departments.</p>

                </div>

                <button
                    className="add-department-btn"
                    onClick={() => navigate("/add-department")}
                >

                    <FaPlus />

                    <span>Add Department</span>

                </button>

            </div>

            {/* Stats */}

            <div className="department-stats">

                <div className="department-stat-card">

                    <h3>{departments.length}</h3>

                    <span>Total Departments</span>

                </div>

                <div className="department-stat-card">

                    <h3>{departments.length}</h3>

                    <span>Active Departments</span>

                </div>

                <div className="department-stat-card">

                    <h3>{departments.length}</h3>

                    <span>Department Codes</span>

                </div>

            </div>

            {/* Search */}

            <div className="department-search">

                <div className="department-search-box">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search department..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

            </div>

            {/* Table */}

            <div className="department-table-card">

                <table className="department-table">

                    <thead>

                    <tr>

                        <th>Name</th>
                        <th>Code</th>
                        <th>Description</th>
                        <th>Actions</th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        filteredDepartments.map((department) => (

                            <tr key={department.id}>

                                <td>

                                    <div className="department-name">

                                        <div className="department-avatar">

                                            {department.departmentName.charAt(0)}

                                        </div>

                                        <span>

                                                {department.departmentName}

                                            </span>

                                    </div>

                                </td>

                                <td>

                                    {department.departmentCode}

                                </td>

                                <td>

                                    {department.description}

                                </td>

                                <td>

                                    <div className="department-actions">

                                        <button
                                            className="view-btn"
                                            onClick={() =>
                                                alert(
                                                    `Department : ${department.departmentName}\nCode : ${department.departmentCode}\nDescription : ${department.description}`
                                                )
                                            }
                                        >

                                            <FaEye />

                                        </button>

                                        <button
                                            className="edit-btn"
                                            onClick={() =>
                                                navigate(`/edit-department?id=${department.id}`)
                                            }
                                        >

                                            <FaEdit />

                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(department.id)}
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

            {/* Pagination */}

            <div className="department-pagination">

                <button>

                    <FaAngleLeft />

                </button>

                <button className="active">

                    1

                </button>

                <button>

                    <FaAngleRight />

                </button>

            </div>

        </div>

    );

}

export default Departments;