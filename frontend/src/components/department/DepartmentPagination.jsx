import "./DepartmentPagination.css";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";

function DepartmentPagination() {

    return (

        <div className="department-pagination">

            <button>

                <FaAngleLeft />

            </button>

            <button className="active">

                1

            </button>

            <button>

                2

            </button>

            <button>

                3

            </button>

            <button>

                <FaAngleRight />

            </button>

        </div>

    );

}

export default DepartmentPagination;