import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import "./DashboardLayout.css";

function DashboardLayout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {

        setSidebarOpen(!sidebarOpen);

    };

    const closeSidebar = () => {

        setSidebarOpen(false);

    };

    return (

        <div className="layout">

            {/* Overlay */}

            <div
                className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
                onClick={closeSidebar}
            ></div>

            <Sidebar
                sidebarOpen={sidebarOpen}
                closeSidebar={closeSidebar}
            />

            <div className="main-content">

                <Navbar toggleSidebar={toggleSidebar} />

                <main className="page-content">

                    {children}

                </main>

            </div>

        </div>

    );

}

export default DashboardLayout;