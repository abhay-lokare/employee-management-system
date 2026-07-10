import { FaPlus } from "react-icons/fa";

import "./DepartmentHeader.css";

function DepartmentHeader({

                              title="Departments",

                              subtitle="Manage all company departments.",

                              showButton=true,

                              onAddDepartment

                          }){

    return(

        <div className="department-header">

            <div>

                <h2>{title}</h2>

                <p>{subtitle}</p>

            </div>

            {

                showButton && (

                    <button

                        className="add-department-btn"

                        onClick={onAddDepartment}

                    >

                        <FaPlus />

                        <span>Add Department</span>

                    </button>

                )

            }

        </div>

    );

}

export default DepartmentHeader;