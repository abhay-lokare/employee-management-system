import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import "../../styles/EmployeeForm.css";
import { getEmployee } from "../../services/employeeService";

function EmployeeDetails() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadEmployee() {
            if (!id) {
                setError("Employee ID is missing.");
                return;
            }

            try {
                const response = await getEmployee(id);
                setEmployee(response.data);
            } catch (requestError) {
                console.error(requestError);
                setError("Unable to load employee details.");
            }
        }

        loadEmployee();
    }, [id]);

    if (error) {
        return <div className="employee-page"><p className="form-error">{error}</p></div>;
    }

    if (!employee) {
        return <div className="loading-container"><div className="spinner" /></div>;
    }

    return (
        <div className="employee-page">
            <div className="page-header">
                <h1>Employee Details</h1>
                <p>Complete employee information.</p>
            </div>

            <div className="employee-details-card">
                <div className="employee-profile">
                    <div className="employee-profile-avatar">{employee.firstName.charAt(0)}</div>
                    <div className="employee-profile-info">
                        <h2>{employee.firstName} {employee.lastName}</h2>
                        <p>{employee.designation}</p>
                    </div>
                </div>

                <div className="details-grid">
                    <div className="detail-box"><label>First Name</label><span>{employee.firstName}</span></div>
                    <div className="detail-box"><label>Last Name</label><span>{employee.lastName}</span></div>
                    <div className="detail-box"><label>Email</label><span>{employee.email}</span></div>
                    <div className="detail-box"><label>Phone</label><span>{employee.phone}</span></div>
                    <div className="detail-box"><label>Department</label><span>{employee.department}</span></div>
                    <div className="detail-box"><label>Designation</label><span>{employee.designation}</span></div>
                    <div className="detail-box"><label>Salary</label><span>₹ {employee.salary}</span></div>
                    <div className="detail-box"><label>Status</label><span className={`status ${employee.status.toLowerCase()}`}>{employee.status}</span></div>
                    <div className="detail-box"><label>Joining Date</label><span>{employee.joiningDate}</span></div>
                    <div className="detail-box full-width"><label>Address</label><span>{employee.address || "-"}</span></div>
                </div>

                <div className="employee-login-details">
                    <h3>Employee Login Credentials</h3>
                    <p>Give these credentials to the employee for access to the Employee Portal.</p>
                    <div className="details-grid">
                        <div className="detail-box"><label>Employee Login ID</label><span>EMP{employee.id}</span></div>
                        <div className="detail-box"><label>Default Password</label><span>Emp@123</span></div>
                    </div>
                </div>

                <div className="employee-details-actions">
                    <button className="secondary-btn" onClick={() => navigate("/employees")}>Back</button>
                    <button className="primary-btn" onClick={() => navigate(`/edit-employee?id=${employee.id}`)}>Edit Employee</button>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDetails;
