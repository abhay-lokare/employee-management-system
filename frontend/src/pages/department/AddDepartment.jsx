import "../../styles/Departments.css";

function AddDepartment() {

    return (

        <div className="department-page">

            <div className="page-header">

                <h1>Add Department</h1>

                <p>Create a new department.</p>

            </div>

            <div className="department-form-card">

                <div className="form-grid">

                    <input
                        type="text"
                        placeholder="Department Name"
                    />

                    <input
                        type="text"
                        placeholder="Department Head"
                    />

                    <input
                        type="number"
                        placeholder="No. of Employees"
                    />

                    <input
                        type="text"
                        placeholder="Location"
                    />

                </div>

                <button className="primary-btn">

                    Save Department

                </button>

            </div>

        </div>

    );

}

export default AddDepartment;