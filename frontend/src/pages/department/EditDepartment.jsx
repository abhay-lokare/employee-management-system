import "../../styles/Departments.css";

function EditDepartment() {

    return (

        <div className="department-page">

            <div className="page-header">

                <h1>Edit Department</h1>

                <p>Update department details.</p>

            </div>

            <div className="department-form-card">

                <div className="form-grid">

                    <input defaultValue="Development" />

                    <input defaultValue="John Smith" />

                    <input defaultValue="85" />

                    <input defaultValue="Floor 3" />

                </div>

                <button className="primary-btn">

                    Update Department

                </button>

            </div>

        </div>

    );

}

export default EditDepartment;