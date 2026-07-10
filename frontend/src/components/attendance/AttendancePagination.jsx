import "./AttendancePagination.css";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa";

function AttendancePagination(){

    return(

        <div className="attendance-pagination">

            <button>
                <FaAngleLeft />

            </button>

            <button className="active">1</button>

            <button>2</button>

            <button>3</button>

            <button>
                <FaAngleRight />
            </button>

        </div>

    );

}

export default AttendancePagination;