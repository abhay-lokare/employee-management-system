import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import "../../styles/EmployeeForm.css";
import { getEmployee, updateEmployee } from "../../services/employeeService";
import { getDepartments } from "../../services/departmentService";

function EditEmployee() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [departments, setDepartments] = useState([]);
    const [formError, setFormError] = useState("");
    const [employee, setEmployee] = useState({
        firstName: "", lastName: "", email: "", phone: "", department: "",
        designation: "", salary: "", status: "Active", address: "", joiningDate: ""
    });

    useEffect(() => {
        async function loadFormData() {
            if (!id) {
                setFormError("Employee ID is missing.");
                return;
            }

            try {
                const [employeeResponse, departmentsResponse] = await Promise.all([
                    getEmployee(id),
                    getDepartments()
                ]);
                const loadedEmployee = employeeResponse.data;
                setEmployee({
                    firstName: loadedEmployee.firstName || "",
                    lastName: loadedEmployee.lastName || "",
                    email: loadedEmployee.email || "",
                    phone: loadedEmployee.phone || "",
                    department: loadedEmployee.department || "",
                    designation: loadedEmployee.designation || "",
                    salary: loadedEmployee.salary || "",
                    status: loadedEmployee.status || "Active",
                    address: loadedEmployee.address || "",
                    joiningDate: loadedEmployee.joiningDate || ""
                });
                setDepartments(departmentsResponse.data);
            } catch (error) {
                console.error(error);
                setFormError("Unable to load employee information.");
            }
        }

        loadFormData();
    }, [id]);

    function handleChange(event) {
        setEmployee({ ...employee, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            setFormError("");
            await updateEmployee(id, employee);
            toast.success("Employee updated successfully.");
            navigate("/employees");
        } catch (error) {
            console.error(error);
            setFormError("Unable to update employee. Check the entered details.");
            toast.error("Unable to update employee.");
        }
    }

    return (
        <div className="employee-form-page">
            <div className="employee-form-card">
                <h2>Edit Employee</h2>
                <p>Update employee information.</p>

                {formError && <p className="form-error">{formError}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="form-group"><label>First Name</label><input type="text" name="firstName" value={employee.firstName} onChange={handleChange} required /></div>
                        <div className="form-group"><label>Last Name</label><input type="text" name="lastName" value={employee.lastName} onChange={handleChange} required /></div>
                        <div className="form-group"><label>Email</label><input type="email" name="email" value={employee.email} onChange={handleChange} required /></div>
                        <div className="form-group"><label>Phone</label><input type="text" name="phone" value={employee.phone} onChange={handleChange} required /></div>

                        <div className="form-group">
                            <label>Department</label>
                            <select name="department" value={employee.department} onChange={handleChange} required>
                                <option value="">Select department</option>
                                {departments.map((department) => <option key={department.id} value={department.departmentName}>{department.departmentName} ({department.departmentCode})</option>)}
                            </select>
                        </div>

                        <div className="form-group"><label>Designation</label><input type="text" name="designation" value={employee.designation} onChange={handleChange} required /></div>
                        <div className="form-group"><label>Salary</label><input type="number" min="0" name="salary" value={employee.salary} onChange={handleChange} required /></div>

                        <div className="form-group">
                            <label>Status</label>
                            <select name="status" value={employee.status} onChange={handleChange}>
                                <option>Active</option><option>Leave</option><option>Inactive</option>
                            </select>
                        </div>

                        <div className="form-group"><label>Joining Date</label><input type="date" name="joiningDate" value={employee.joiningDate} onChange={handleChange} required /></div>
                        <div className="form-group full-width"><label>Address</label><textarea name="address" value={employee.address} onChange={handleChange} /></div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="secondary-btn" onClick={() => navigate("/employees")}>Cancel</button>
                        <button type="submit" className="primary-btn">Update Employee</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditEmployee;
