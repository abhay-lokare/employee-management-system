import {
    FaEye,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import "./EmployeeRow.css";

function EmployeeRow({ employee, onView }) {

    return (

        <tr>

            <td>

                <div className="employee-info">

                    <div className="employee-avatar">

                        {employee.name.charAt(0)}

                    </div>

                    <div className="employee-details">

                        <h6>{employee.name}</h6>

                        <span>{employee.email}</span>

                    </div>

                </div>

            </td>

            <td>{employee.department}</td>

            <td>{employee.designation}</td>

            <td>{employee.salary}</td>

            <td>

                <span className={`status ${employee.status.toLowerCase()}`}>

                    {employee.status}

                </span>

            </td>

            <td>

                <div className="table-actions">

                    <button
                        className="view-btn"
                        onClick={onView}
                    >

                        <FaEye />

                    </button>

                    <button className="edit-btn">

                        <FaEdit />

                    </button>

                    <button className="delete-btn">

                        <FaTrash />

                    </button>

                </div>

            </td>

        </tr>

    );

}

export default EmployeeRow;