import { useState } from "react";

import EmployeeRow from "./EmployeeRow";
import EmployeeDetailsModal from "./EmployeeDetailsModal";

import "./EmployeeTable.css";

function EmployeeTable() {

    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const employees = [

        {
            id:1,
            name:"John Smith",
            email:"john@company.com",
            department:"Development",
            designation:"Frontend Developer",
            salary:"₹65,000",
            status:"Active"
        },

        {
            id:2,
            name:"Emma Watson",
            email:"emma@company.com",
            department:"HR",
            designation:"HR Manager",
            salary:"₹58,000",
            status:"Active"
        },

        {
            id:3,
            name:"Michael Brown",
            email:"michael@company.com",
            department:"Finance",
            designation:"Accountant",
            salary:"₹52,000",
            status:"Leave"
        },

        {
            id:4,
            name:"David Wilson",
            email:"david@company.com",
            department:"Marketing",
            designation:"Marketing Lead",
            salary:"₹61,000",
            status:"Inactive"
        }

    ];

    return (

        <>

            <div className="employee-table-card">

                <table className="employee-table">

                    <thead>

                    <tr>

                        <th>Employee</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Salary</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        employees.map((employee)=>(

                            <EmployeeRow

                                key={employee.id}

                                employee={employee}

                                onView={() => setSelectedEmployee(employee)}

                            />

                        ))

                    }

                    </tbody>

                </table>

            </div>

            <EmployeeDetailsModal

                employee={selectedEmployee}

                onClose={() => setSelectedEmployee(null)}

            />

        </>

    );

}

export default EmployeeTable;