import {
    FaUsers,
    FaUserCheck,
    FaUserClock,
    FaUserPlus
} from "react-icons/fa";

import "./EmployeeStats.css";

function EmployeeStats() {

    const stats = [

        {
            title: "Total Employees",
            value: "248",
            color: "#4F46E5",
            icon: <FaUsers />
        },

        {
            title: "Active Employees",
            value: "226",
            color: "#22C55E",
            icon: <FaUserCheck />
        },

        {
            title: "On Leave",
            value: "14",
            color: "#F59E0B",
            icon: <FaUserClock />
        },

        {
            title: "New Joinees",
            value: "8",
            color: "#06B6D4",
            icon: <FaUserPlus />
        }

    ];

    return (

        <div className="employee-stats">

            {

                stats.map((item,index)=>(

                    <div
                        className="employee-stat-card"
                        key={index}
                    >

                        <div
                            className="employee-stat-icon"
                            style={{background:item.color}}
                        >

                            {item.icon}

                        </div>

                        <h3>{item.value}</h3>

                        <p>{item.title}</p>

                    </div>

                ))

            }

        </div>

    );

}

export default EmployeeStats;