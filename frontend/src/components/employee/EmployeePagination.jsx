import {
    FaAngleLeft,
    FaAngleRight
} from "react-icons/fa";

import "./EmployeePagination.css";

function EmployeePagination() {

    return (

        <div className="employee-pagination">

            <button className="page-btn">

                <FaAngleLeft />

            </button>

            <button className="page-number active">
                1
            </button>

            <button className="page-number">
                2
            </button>

            <button className="page-number">
                3
            </button>

            <button className="page-number">
                4
            </button>

            <button className="page-btn">

                <FaAngleRight />

            </button>

        </div>

    );

}

export default EmployeePagination;