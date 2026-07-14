import "../../styles/Employees.css";

function EditEmployee() {

  return (

      <div className="employee-page">

        <div className="page-header">

          <h1>Edit Employee</h1>

          <p>Update employee information.</p>

        </div>

        <div className="employee-form-card">

          <div className="form-grid">

            <input defaultValue="John Smith"/>

            <input defaultValue="john@company.com"/>

            <input defaultValue="9876543210"/>

            <select defaultValue="Development">

              <option>Development</option>

              <option>HR</option>

              <option>Finance</option>

              <option>Marketing</option>

            </select>

            <input defaultValue="Frontend Developer"/>

            <input defaultValue="65000"/>

          </div>

          <button className="primary-btn">

            Update Employee

          </button>

        </div>

      </div>

  );

}

export default EditEmployee;