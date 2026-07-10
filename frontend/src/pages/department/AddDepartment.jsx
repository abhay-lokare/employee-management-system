import "../../components/department/Departments.css";

import DepartmentHeader from "../../components/department/DepartmentHeader";

function AddDepartment() {

    return (

        <div className="departments-page">

            <DepartmentHeader

                title="Add Department"

                subtitle="Create a new department"

                showButton={false}

            />

        </div>

    );

}

export default AddDepartment;