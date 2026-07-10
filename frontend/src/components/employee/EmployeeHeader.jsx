import { FaUserPlus } from "react-icons/fa";
import "./EmployeeHeader.css";

function EmployeeHeader({

                            title = "Employees",

                            subtitle = "Manage all employees from one place.",

                            showButton = true,

                            onAddEmployee

                        }) {

    return (

        <div className="employee-header">

            <div className="employee-header-left">

                <h2>
                    {title}
                </h2>

                <p>
                    {subtitle}
                </p>

            </div>

            {

                showButton && (

                    <button
                        className="add-employee-btn"
                        onClick={onAddEmployee}
                    >

                        <FaUserPlus />

                        <span>
                            Add Employee
                        </span>

                    </button>

                )

            }

        </div>

    );

}

export default EmployeeHeader;