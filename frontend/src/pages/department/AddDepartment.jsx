import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../../styles/Departments.css";

import { createDepartment } from "../../services/departmentService";

function AddDepartment() {

    const navigate = useNavigate();

    const [department, setDepartment] = useState({

        departmentName: "",
        departmentCode: "",
        description: ""

    });

    function handleChange(e) {

        setDepartment({

            ...department,
            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await createDepartment(department);

            toast.success("Department created successfully.");

            navigate("/departments");

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to create department.");

        }

    }

    return (

        <div className="department-page">

            <div className="page-header">

                <h1>Add Department</h1>

                <p>Create a new department.</p>

            </div>

            <form
                className="department-form-card"
                onSubmit={handleSubmit}
            >

                <div className="form-grid">

                    <input
                        type="text"
                        name="departmentName"
                        placeholder="Department Name"
                        value={department.departmentName}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="departmentCode"
                        placeholder="Department Code"
                        value={department.departmentCode}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="description"
                        placeholder="Department Description"
                        value={department.description}
                        onChange={handleChange}
                        rows="5"
                    />

                </div>

                <button
                    type="submit"
                    className="primary-btn"
                >

                    Save Department

                </button>

            </form>

        </div>

    );

}

export default AddDepartment;
