import "../../components/department/Departments.css";

import DepartmentHeader from "../../components/department/DepartmentHeader";

function EditDepartment() {

    return (

        <div className="departments-page">

            <DepartmentHeader

                title="Edit Department"

                subtitle="Update department information"

                showButton={false}

            />

        </div>

    );

}

export default EditDepartment;