import "../../styles/AddEmployee.css";

import EmployeeHeader from "../../components/employee/EmployeeHeader";
import EmployeeForm from "../../components/employee/EmployeeForm";

function EditEmployee() {

    const employee = {

        firstName: "John",
        lastName: "Smith",
        email: "john@company.com",
        phone: "+91 9876543210",
        gender: "Male",
        dob: "1998-08-14",

        employeeId: "EMP001",
        department: "Development",
        designation: "Frontend Developer",
        joiningDate: "2024-01-12",
        salary: "65000",
        status: "Active"

    };

    return (

        <div className="add-employee-page">

            <EmployeeHeader

                title="Edit Employee"

                subtitle="Update employee information"

                showButton={false}

            />

            <EmployeeForm

                employee={employee}

                isEdit={true}

            />

        </div>

    );

}

export default EditEmployee;