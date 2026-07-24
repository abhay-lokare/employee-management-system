import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import "../../styles/Departments.css";

import {
    getDepartment,
    updateDepartment
} from "../../services/departmentService";

function EditDepartment() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const id = searchParams.get("id");

    const [department, setDepartment] = useState({

        departmentName: "",
        departmentCode: "",
        description: ""

    });

    const loadDepartment = useCallback(async () => {

        try {

            const response = await getDepartment(id);

            setDepartment(response.data);

        }

        catch (error) {

            console.log(error);

        }

    }, [id]);

    useEffect(() => {

        loadDepartment();

    }, [loadDepartment]);

    function handleChange(e) {

        setDepartment({

            ...department,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await updateDepartment(id, department);

            toast.success("Department updated successfully.");

            navigate("/departments");

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to update department.");

        }

    }

    return (

        <div className="department-page">

            <div className="page-header">

                <h1>Edit Department</h1>

                <p>Update department details.</p>

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
                        rows="5"
                        value={department.description}
                        onChange={handleChange}
                    />

                </div>

                <button
                    type="submit"
                    className="primary-btn"
                >

                    Update Department

                </button>

            </form>

        </div>

    );

}

export default EditDepartment;
