import {
    FaUserPlus,
    FaBuilding,
    FaChartLine,
    FaFileExport
} from "react-icons/fa";

import "./QuickActions.css";

function QuickActions() {

    const actions = [
        {
            title: "Add Employee",
            icon: <FaUserPlus />,
            color: "#2563eb"
        },
        {
            title: "Departments",
            icon: <FaBuilding />,
            color: "#14b8a6"
        },
        {
            title: "View Reports",
            icon: <FaChartLine />,
            color: "#8b5cf6"
        },
        {
            title: "Export Data",
            icon: <FaFileExport />,
            color: "#f59e0b"
        }
    ];

    return (

        <div className="quick-actions">

            {actions.map((item, index) => (

                <div
                    className="quick-card"
                    key={index}
                >

                    <div
                        className="quick-icon"
                        style={{ background: item.color }}
                    >
                        {item.icon}
                    </div>

                    <h5>{item.title}</h5>

                </div>

            ))}

        </div>

    );

}

export default QuickActions;