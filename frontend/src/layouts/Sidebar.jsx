import {
    FaHome,
    FaUsers,
    FaUserPlus,
    FaBuilding,
    FaClipboardCheck,
    FaCalendarAlt,
    FaChartBar,
    FaCog,
    FaTimes
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { FaMoneyCheckAlt } from "react-icons/fa";
import "./Sidebar.css";

function Sidebar({ sidebarOpen, closeSidebar }) {

    return (

        <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>

            {/* Close Button */}

            <button
                className="close-btn"
                onClick={closeSidebar}
            >
                <FaTimes />
            </button>

            {/* Logo */}

            <div className="logo-section">

                <div className="logo">
                    ⚡
                </div>

                <div className="logo-text">

                    <h2>EMS Pro</h2>

                    <p>Management</p>

                </div>

            </div>

            {/* Navigation */}

            <nav className="menu">

                <NavLink
                    to="/"
                    onClick={closeSidebar}
                >
                    <FaHome />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink
                    to="/employees"
                    onClick={closeSidebar}
                >
                    <FaUsers />
                    <span>Employees</span>
                </NavLink>

                <NavLink
                    to="/add-employee"
                    onClick={closeSidebar}
                >
                    <FaUserPlus />
                    <span>Add Employee</span>
                </NavLink>

                <NavLink
                    to="/departments"
                    onClick={closeSidebar}
                >
                    <FaBuilding />
                    <span>Departments</span>
                </NavLink>

                <NavLink
                    to="/attendance"
                    onClick={closeSidebar}
                >
                    <FaClipboardCheck />
                    <span>Attendance</span>
                </NavLink>
                <NavLink
                    to="/payroll"
                    onClick={closeSidebar}
                >
                    <FaMoneyCheckAlt />
                    <span>Payroll</span>
                </NavLink>

                <NavLink
                    to="/leave"
                    onClick={closeSidebar}
                >
                    <FaCalendarAlt />
                    <span>Leave</span>
                </NavLink>

                <NavLink
                    to="/reports"
                    onClick={closeSidebar}
                >
                    <FaChartBar />
                    <span>Reports</span>
                </NavLink>

            </nav>

            {/* Bottom */}

            <div className="settings">

                <NavLink
                    to="/settings"
                    onClick={closeSidebar}
                >
                    <FaCog />
                    <span>Settings</span>
                </NavLink>

            </div>

        </aside>

    );

}

export default Sidebar;