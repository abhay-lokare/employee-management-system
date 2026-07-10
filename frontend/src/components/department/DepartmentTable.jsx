import DepartmentRow from "./DepartmentRow";

import "./DepartmentTable.css";

function DepartmentTable() {

    const departments = [

        {
            id:1,
            name:"Development",
            head:"John Smith",
            employees:85,
            location:"Floor 3"
        },

        {
            id:2,
            name:"Human Resources",
            head:"Emma Watson",
            employees:18,
            location:"Floor 2"
        },

        {
            id:3,
            name:"Finance",
            head:"Michael Brown",
            employees:24,
            location:"Floor 1"
        },

        {
            id:4,
            name:"Marketing",
            head:"David Wilson",
            employees:31,
            location:"Floor 4"
        }

    ];

    return (

        <div className="department-table-card">

            <table className="department-table">

                <thead>

                <tr>

                    <th>Department</th>
                    <th>Head</th>
                    <th>Employees</th>
                    <th>Location</th>
                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {

                    departments.map((department)=>(

                        <DepartmentRow

                            key={department.id}

                            department={department}

                        />

                    ))

                }

                </tbody>

            </table>

        </div>

    );

}

export default DepartmentTable;