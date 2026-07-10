import "./EmployeeDetailsModal.css";

function EmployeeDetailsModal({

                                  employee,
                                  onClose

                              }) {

    if (!employee) return null;

    return (

        <div className="employee-modal-overlay">

            <div className="employee-modal">

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="employee-modal-avatar">

                    {employee.name.charAt(0)}

                </div>

                <h2>{employee.name}</h2>

                <p className="employee-id">

                    EMP{employee.id.toString().padStart(3,"0")}

                </p>

                <div className="employee-info-grid">

                    <div>

                        <span>Email</span>

                        <h5>{employee.email}</h5>

                    </div>

                    <div>

                        <span>Department</span>

                        <h5>{employee.department}</h5>

                    </div>

                    <div>

                        <span>Designation</span>

                        <h5>{employee.designation}</h5>

                    </div>

                    <div>

                        <span>Salary</span>

                        <h5>{employee.salary}</h5>

                    </div>

                    <div>

                        <span>Status</span>

                        <h5>{employee.status}</h5>

                    </div>

                    <div>

                        <span>Phone</span>

                        <h5>+91 9876543210</h5>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default EmployeeDetailsModal;