import "../../styles/Employees.css";

function AddEmployee() {

    return (

        <div className="employee-page">

            <div className="page-header">

                <h1>Add Employee</h1>

                <p>Create a new employee profile.</p>

            </div>

            <div className="employee-form-card">

                <div className="form-grid">

                    <input type="text" placeholder="Full Name" />

                    <input type="email" placeholder="Email" />

                    <input type="text" placeholder="Phone Number" />

                    <select>

                        <option>Select Department</option>

                        <option>Development</option>

                        <option>HR</option>

                        <option>Finance</option>

                        <option>Marketing</option>

                    </select>

                    <input type="text" placeholder="Designation" />

                    <input type="number" placeholder="Salary" />

                </div>

                <button className="primary-btn">

                    Save Employee

                </button>

            </div>

        </div>

    );

}

export default AddEmployee;