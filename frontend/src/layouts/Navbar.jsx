import {
    FaBell,
    FaSearch,
    FaBars
} from "react-icons/fa";

import "./Navbar.css";

function Navbar({ toggleSidebar }) {

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

                <div className="icon-btn">

                    <FaBell />

                    <span className="badge">3</span>

                </div>

                <div className="profile">

                    <div className="avatar">
                        A
                    </div>

                    <div className="profile-info">

                        <h6>Abhay</h6>

                        <span>Administrator</span>

                    </div>

                </div>

            </div>

        </header>

    );

}

export default Navbar;