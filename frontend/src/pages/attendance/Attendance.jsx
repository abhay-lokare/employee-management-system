import {
    FaClipboardCheck,
    FaSearch,
    FaAngleLeft,
    FaAngleRight
} from "react-icons/fa";

import "../../styles/Attendance.css";

function Attendance() {

    const attendance = [

        {
            id:1,
            employee:"John Smith",
            department:"Development",
            date:"10 Jul 2026",
            checkIn:"09:02 AM",
            checkOut:"06:12 PM",
            status:"Present"
        },

        {
            id:2,
            employee:"Emma Watson",
            department:"HR",
            date:"10 Jul 2026",
            checkIn:"09:10 AM",
            checkOut:"06:00 PM",
            status:"Present"
        },

        {
            id:3,
            employee:"Michael Brown",
            department:"Finance",
            date:"10 Jul 2026",
            checkIn:"--",
            checkOut:"--",
            status:"Leave"
        }

    ];

    return(

        <div className="attendance-page">

            {/* Header */}

            <div className="attendance-header">

                <div>

                    <h2>Attendance</h2>

                    <p>

                        Manage employee attendance.

                    </p>

                </div>

                <button className="attendance-btn">

                    <FaClipboardCheck />

                    <span>

                        Mark Attendance

                    </span>

                </button>

            </div>

            {/* Stats */}

            <div className="attendance-stats">

                <div className="attendance-card">

                    <h3>248</h3>

                    <span>Total Employees</span>

                </div>

                <div className="attendance-card">

                    <h3>226</h3>

                    <span>Present Today</span>

                </div>

                <div className="attendance-card">

                    <h3>12</h3>

                    <span>On Leave</span>

                </div>

                <div className="attendance-card">

                    <h3>10</h3>

                    <span>Absent</span>

                </div>

            </div>

            {/* Search */}

            <div className="attendance-search">

                <div className="attendance-search-box">

                    <FaSearch />

                    <input

                        type="text"

                        placeholder="Search employee..."

                    />

                </div>

            </div>

            {/* Table */}

            <div className="attendance-table-card">

                <table className="attendance-table">

                    <thead>

                    <tr>

                        <th>Employee</th>

                        <th>Department</th>

                        <th>Date</th>

                        <th>Check In</th>

                        <th>Check Out</th>

                        <th>Status</th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        attendance.map(item=>(

                            <tr key={item.id}>

                                <td>{item.employee}</td>

                                <td>{item.department}</td>

                                <td>{item.date}</td>

                                <td>{item.checkIn}</td>

                                <td>{item.checkOut}</td>

                                <td>

                                    <span className={`attendance-status ${item.status.toLowerCase()}`}>

                                        {item.status}

                                    </span>

                                </td>

                            </tr>

                        ))

                    }

                    </tbody>

                </table>

            </div>
            {/* Pagination */}

            <div className="attendance-pagination">

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

        </div>

    );

}

export default Attendance;