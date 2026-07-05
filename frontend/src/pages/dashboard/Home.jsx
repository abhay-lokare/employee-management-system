import {
  FaUsers,
  FaBuilding,
  FaUserCheck,
  FaBriefcase
} from "react-icons/fa";

import "./Home.css";
import StatCard from "../../components/dashboard/StatCard";

function Home() {
  return (
    <div className="dashboard-page">

      <div className="hero-card">

        <div className="hero-left">

          <span className="hero-badge">
            Employee Management System
          </span>

          <h1>
            Good Morning, Abhay 👋
          </h1>

          <p>
            Welcome back! You currently manage
            <strong> 248 employees </strong>
            across
            <strong> 12 departments.</strong>
            Everything looks great today.
          </p>

          <div className="hero-buttons">

            <button className="btn-primary-custom">
              + Add Employee
            </button>

            <button className="btn-secondary-custom">
              View Reports
            </button>

          </div>

        </div>

        <div className="hero-right">

          <div className="stats-grid">

            <StatCard
              title="Employees"
              subtitle="Total Employees"
              value="248"
              growth="+12.5%"
              icon={<FaUsers />}
              color="#4F46E5"
            />

            <StatCard
              title="Departments"
              subtitle="Active Departments"
              value="12"
              growth="+8.2%"
              icon={<FaBuilding />}
              color="#14B8A6"
            />

            <StatCard
              title="Managers"
              subtitle="Department Heads"
              value="18"
              growth="+4.6%"
              icon={<FaBriefcase />}
              color="#F59E0B"
            />

            <StatCard
              title="Active"
              subtitle="Currently Working"
              value="226"
              growth="+15.1%"
              icon={<FaUserCheck />}
              color="#22C55E"
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;