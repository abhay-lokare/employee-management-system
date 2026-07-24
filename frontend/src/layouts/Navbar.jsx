import {
  FaRegBell,
  FaSearch,
  FaBars,
  FaCalendarAlt
} from "react-icons/fa";

import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "../services/authService";
import { getLeaveRequests } from "../services/leaveService";

function Navbar({ toggleSidebar }) {

  const navigate = useNavigate();
  const user = getCurrentUser();
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    loadNotifications();
    const timer = setInterval(loadNotifications, 30000);

    return () => clearInterval(timer);
  }, []);

  async function loadNotifications() {
    try {
      const response = await getLeaveRequests();
      setPendingLeaves(response.data.filter((leave) => leave.status === "Pending"));
    } catch (error) {
      console.error(error);
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function openLeaveManagement() {
    setShowNotifications(false);
    navigate("/leave");
  }

  return (

    <header className="navbar-custom">

      <button
        className="menu-btn"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>

      <div className="search-box">

        <FaSearch />

        <input
          type="text"
          placeholder="Search employees..."
        />

      </div>

      <div className="navbar-right">

        <div className="notification-area">
          <button className="icon-btn" onClick={() => setShowNotifications(!showNotifications)} aria-label="View leave request notifications">
            <div className="bell-wrapper">
              <FaRegBell />
              {pendingLeaves.length > 0 && <span className="badge">{pendingLeaves.length}</span>}
            </div>
          </button>

          {showNotifications && (
            <div className="notification-panel">
              <div className="notification-title"><h4>Leave Requests</h4><span>{pendingLeaves.length} pending</span></div>
              {pendingLeaves.length === 0 && <p className="no-notifications">No pending leave requests.</p>}
              {pendingLeaves.slice(0, 5).map((leave) => (
                <button className="notification-item" key={leave.id} onClick={openLeaveManagement}>
                  <FaCalendarAlt />
                  <span><strong>{leave.employeeName}</strong> requested {leave.leaveType}<small>{leave.fromDate} to {leave.toDate}</small></span>
                </button>
              ))}
              {pendingLeaves.length > 0 && <button className="view-all-notifications" onClick={openLeaveManagement}>Review all leave requests</button>}
            </div>
          )}
        </div>

        <div className="profile">

          <div className="avatar">
            A
          </div>

          <div className="profile-info" onClick={handleLogout} title="Click to logout">

            <h6>{user?.name || "Administrator"}</h6>

            <span>Administrator • Logout</span>

          </div>

        </div>

      </div>

    </header>

  );

}

export default Navbar;
