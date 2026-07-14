import {
    FaUsers,
    FaMoneyBillWave,
    FaCalendarCheck,
    FaBuilding,
    FaDownload
} from "react-icons/fa";

import "../../styles/Reports.css";

function Reports() {

    const reports = [
        {
            icon: <FaUsers />,
            title: "Employee Report",
            description: "View complete employee information."
        },
        {
            icon: <FaCalendarCheck />,
            title: "Attendance Report",
            description: "Monthly attendance summary."
        },
        {
            icon: <FaMoneyBillWave />,
            title: "Payroll Report",
            description: "Salary and payroll details."
        },
        {
            icon: <FaBuilding />,
            title: "Department Report",
            description: "Department performance overview."
        }
    ];

    return (
        <div className="reports-page">

            <div className="page-header">
                <h1>Reports</h1>
                <p>Generate and download company reports.</p>
            </div>

            <div className="reports-grid">

                {reports.map((report, index) => (

                    <div className="report-card" key={index}>

                        <div className="report-icon">
                            {report.icon}
                        </div>

                        <h3>{report.title}</h3>

                        <p>{report.description}</p>

                        <button>

                            <FaDownload />

                            Download

                        </button>

                    </div>

                ))}

            </div>

        </div>
    );

}

export default Reports;