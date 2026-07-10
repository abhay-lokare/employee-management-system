import "../../styles/AddEmployee.css";

import EmployeeHeader from "../../components/employee/EmployeeHeader";
import EmployeeForm from "../../components/employee/EmployeeForm";

function AddEmployee() {

  return (

      <div className="add-employee-page">

        <EmployeeHeader
            title="Add Employee"
            subtitle="Create a new employee profile"
            showButton={false}
        />

        <EmployeeForm />

      </div>

  );

}

export default AddEmployee;