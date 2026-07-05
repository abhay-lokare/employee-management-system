import {
  FaHome,
  FaUsers,
  FaUserPlus,
  FaBuilding,
  FaChartBar,
  FaCog,
  FaTimes
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar({ sidebarOpen, closeSidebar }) {

  return (

    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>

      {/* Close button (Mobile Only) */}

      <button className="close-btn" onClick={closeSidebar}>
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

      {/* Menu */}

      <nav className="menu">

        <a href="#" className="active" onClick={closeSidebar}>
          <FaHome />
          <span>Dashboard</span>
        </a>

        <a href="#" onClick={closeSidebar}>
          <FaUsers />
          <span>Employees</span>
        </a>

        <a href="#" onClick={closeSidebar}>
          <FaUserPlus />
          <span>Add Employee</span>
        </a>

        <a href="#" onClick={closeSidebar}>
          <FaBuilding />
          <span>Departments</span>
        </a>

        <a href="#" onClick={closeSidebar}>
          <FaChartBar />
          <span>Reports</span>
        </a>

      </nav>

      {/* Bottom */}

      <div className="settings">

        <a href="#" onClick={closeSidebar}>

          <FaCog />

          <span>Settings</span>

        </a>

      </div>

    </aside>

  );

}

export default Sidebar;