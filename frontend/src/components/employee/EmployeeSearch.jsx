import { FaSearch, FaFilter } from "react-icons/fa";
import "./EmployeeSearch.css";

function EmployeeSearch() {

    return (

        <div className="employee-search-container">

            <div className="employee-search-box">

                <FaSearch />

                <input
                    type="text"
                    placeholder="Search employees..."
                />

            </div>

            <div className="employee-filter-group">

                <select>

                    <option>All Departments</option>
                    <option>Development</option>
                    <option>HR</option>
                    <option>Finance</option>
                    <option>Marketing</option>

                </select>

                <select>

                    <option>All Status</option>
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Leave</option>

                </select>

                <button className="filter-btn">

                    <FaFilter />

                    <span>Filter</span>

                </button>

            </div>

        </div>

    );

}

export default EmployeeSearch;