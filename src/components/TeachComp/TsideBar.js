import React from 'react'
import { Link } from 'react-router-dom';

const TsideBar = () => {
     const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login"; // redirect to login
    };
  return (
    <div className="bg-dark text-white p-4 d-flex flex-column" style={{ width: "250px" }}>
                <h3 className="fw-bold mb-4">eCampus 🎓</h3>
                <ul className="nav flex-column">

                    <li className="nav-item mb-3">
                        <Link to="/teacher" className="nav-link text-white">
                            <i className="bi bi-clipboard2-fill me-2"></i> Dashboard
                        </Link>
                    </li>
                    <li className="nav-item mb-3">
                        <Link to="/Tdrives" className="nav-link text-white">
                            <i className="bi bi-clipboard2-fill me-2"></i> My Drives
                        </Link>
                    </li>
                    <li className="nav-item mb-3">
                        <Link to="/createDrive" className="nav-link text-white">
                            <i className="bi bi-plus-circle-fill me-2"></i> Create Drive
                        </Link>
                    </li>
                    <li className="nav-item mt-auto">
                        <a href="/login" className="nav-link text-white" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right me-2"></i> Logout
                        </a>
                    </li>
                </ul>
            </div>
  )
}

export default TsideBar
