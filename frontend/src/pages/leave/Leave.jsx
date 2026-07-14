import {
    FaSearch,
    FaPlus
} from "react-icons/fa";

import LeaveTable from "../../components/leave/LeaveTable";
import "../../styles/Leave.css";

function Leave() {

    return (

        <div className="leave-page">

            {/* Header */}

            <div className="leave-header">

                <div>

                    <h2>Leave Management</h2>

                    <p>
                        Manage employee leave requests.
                    </p>

                </div>

                <button className="leave-btn">

                    <FaPlus />

                    <span>Apply Leave</span>

                </button>

            </div>

            {/* Stats */}

            <div className="leave-stats">

                <div className="leave-card">

                    <h3>56</h3>

                    <span>Total Requests</span>

                </div>

                <div className="leave-card">

                    <h3>38</h3>

                    <span>Approved</span>

                </div>

                <div className="leave-card">

                    <h3>11</h3>

                    <span>Pending</span>

                </div>

                <div className="leave-card">

                    <h3>7</h3>

                    <span>Rejected</span>

                </div>

            </div>

            {/* Toolbar */}

            <div className="leave-toolbar">

                <div className="leave-search">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search employee..."
                    />

                </div>

                <div className="leave-filters">

                    <select>

                        <option>All Leave Types</option>

                        <option>Casual Leave</option>

                        <option>Sick Leave</option>

                        <option>Earned Leave</option>

                    </select>

                    <select>

                        <option>All Status</option>

                        <option>Approved</option>

                        <option>Pending</option>

                        <option>Rejected</option>

                    </select>

                </div>

            </div>

            {/* Table */}

            <LeaveTable />

            {/* Pagination */}

            <div className="leave-pagination">

                <button>{"<"}</button>

                <button className="active">1</button>

                <button>2</button>

                <button>3</button>

                <button>{">"}</button>

            </div>

        </div>

    );

}

export default Leave;