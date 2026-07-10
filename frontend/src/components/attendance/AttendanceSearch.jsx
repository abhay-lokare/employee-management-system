import { FaSearch } from "react-icons/fa";

import "./AttendanceSearch.css";

function AttendanceSearch(){

    return(

        <div className="attendance-search">

            <div className="attendance-search-box">

                <FaSearch />

                <input

                    type="text"

                    placeholder="Search employee..."

                />

            </div>

        </div>

    );

}

export default AttendanceSearch;
