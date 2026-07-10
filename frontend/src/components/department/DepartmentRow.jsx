import {

    FaEye,
    FaEdit,
    FaTrash

} from "react-icons/fa";

import "./DepartmentRow.css";

function DepartmentRow({ department }) {

    return (

        <tr>

            <td>

                <div className="department-name">

                    <div className="department-avatar">

                        {department.name.charAt(0)}

                    </div>

                    <span>

                        {department.name}

                    </span>

                </div>

            </td>

            <td>{department.head}</td>

            <td>{department.employees}</td>

            <td>{department.location}</td>

            <td>

                <div className="department-actions">

                    <button className="view-btn">

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

export default DepartmentRow;