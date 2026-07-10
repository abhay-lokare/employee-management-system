import { FaSearch } from "react-icons/fa";

import "./DepartmentSearch.css";

function DepartmentSearch() {

    return (

        <div className="department-search">

            <div className="department-search-box">

                <FaSearch />

                <input
                    type="text"
                    placeholder="Search department..."
                />

            </div>

        </div>

    );

}

export default DepartmentSearch;