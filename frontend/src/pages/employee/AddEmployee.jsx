import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../../styles/EmployeeForm.css";
import { createEmployee } from "../../services/employeeService";
import { getDepartments } from "../../services/departmentService";

function AddEmployee() {
    const navigate = useNavigate();
    const [departments, setDepartments] = useState([]);
    const [formError, setFormError] = useState("");
    const [employee, setEmployee] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: "",
        status: "Active",
        address: "",
        joiningDate: ""
    });

    useEffect(() => {
        async function loadDepartments() {
            try {
                const response = await getDepartments();
                setDepartments(response.data);
            } catch (error) {
                console.error(error);
                setFormError("Unable to load departments. Create a department first or check the backend.");
            }
        }

        loadDepartments();
    }, []);

    function handleChange(event) {
        setEmployee({
            ...employee,
            [event.target.name]: event.target.value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setFormError("");
            const response = await createEmployee(employee);
            toast.success(`Employee added. Login ID: EMP${response.data.id} | Password: Emp@123`, { autoClose: 6000 });
            navigate("/employees");
        } catch (error) {
            console.error(error);
            let message = "Unable to add employee. Check the entered details.";

            if (error.response?.data?.message) {
                message = error.response.data.message;
            } else if (error.response?.data?.errors) {
                message = Object.values(error.response.data.errors).join(" ");
            }

            setFormError(message);
            toast.error(message);
        }
    }

    return (
        <div className="employee-form-page">
            <div className="employee-form-card">
                <h2>Add Employee</h2>
                <p>Create a new employee profile.</p>

                {formError && <p className="form-error">{formError}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" name="firstName" value={employee.firstName} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" name="lastName" value={employee.lastName} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" value={employee.email} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Phone</label>
                            <input type="text" name="phone" value={employee.phone} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Department</label>
                            <select name="department" value={employee.department} onChange={handleChange} required>
                                <option value="">Select department</option>
                                {departments.map((department) => (
                                    <option key={department.id} value={department.departmentName}>
                                        {department.departmentName} ({department.departmentCode})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Designation</label>
                            <input type="text" name="designation" value={employee.designation} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Salary</label>
                            <input type="number" min="0" name="salary" value={employee.salary} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Status</label>
                            <select name="status" value={employee.status} onChange={handleChange}>
                                <option>Active</option>
                                <option>Leave</option>
                                <option>Inactive</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Joining Date</label>
                            <input type="date" name="joiningDate" value={employee.joiningDate} onChange={handleChange} required />
                        </div>

                        <div className="form-group full-width">
                            <label>Address</label>
                            <textarea name="address" value={employee.address} onChange={handleChange} />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="secondary-btn" onClick={() => navigate("/employees")}>Cancel</button>
                        <button type="submit" className="primary-btn">Save Employee</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEmployee;
