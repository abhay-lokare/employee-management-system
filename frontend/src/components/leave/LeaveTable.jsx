import {
    FaEye,
    FaEdit,
    FaTrash
} from "react-icons/fa";

function LeaveTable() {

    const leaveRequests = [

        {
            id: 1,
            employee: "John Smith",
            email: "john@company.com",
            type: "Casual Leave",
            from: "10 Jul 2026",
            to: "12 Jul 2026",
            days: 3,
            reason: "Family Function",
            status: "Approved"
        },

        {
            id: 2,
            employee: "Emma Watson",
            email: "emma@company.com",
            type: "Sick Leave",
            from: "15 Jul 2026",
            to: "17 Jul 2026",
            days: 3,
            reason: "Fever",
            status: "Pending"
        },

        {
            id: 3,
            employee: "Michael Brown",
            email: "michael@company.com",
            type: "Earned Leave",
            from: "20 Jul 2026",
            to: "25 Jul 2026",
            days: 6,
            reason: "Vacation",
            status: "Rejected"
        },

        {
            id: 4,
            employee: "David Wilson",
            email: "david@company.com",
            type: "Casual Leave",
            from: "28 Jul 2026",
            to: "29 Jul 2026",
            days: 2,
            reason: "Personal Work",
            status: "Approved"
        }

    ];

    return (

        <div className="leave-table-card">

            <table className="leave-table">

                <thead>

                <tr>

                    <th>Employee</th>
                    <th>Leave Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Days</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {

                    leaveRequests.map((leave)=>(

                        <tr key={leave.id}>

                            <td>

                                <div className="employee-info">

                                    <div className="employee-avatar">

                                        {leave.employee.charAt(0)}

                                    </div>

                                    <div>

                                        <h6>{leave.employee}</h6>

                                        <span>{leave.email}</span>

                                    </div>

                                </div>

                            </td>

                            <td>{leave.type}</td>

                            <td>{leave.from}</td>

                            <td>{leave.to}</td>

                            <td>{leave.days}</td>

                            <td>{leave.reason}</td>

                            <td>

                                    <span className={`leave-status ${leave.status.toLowerCase()}`}>

                                        {leave.status}

                                    </span>

                            </td>

                            <td>

                                <div className="table-actions">

                                    <button className="view-btn">

                                        <FaEye />

                                    </button>

                                    <button className="edit-btn">

                                        <FaEdit />

                                    </button>

                                    <button className="delete-btn">

                                        <FaTrash />

                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))

                }

                </tbody>

            </table>

        </div>

    );

}

export default LeaveTable;