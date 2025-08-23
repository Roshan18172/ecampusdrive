import React from 'react'
import { Link } from 'react-router-dom'

const SsideBar = () => {
        const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login"; // redirect to login
    };
    return (
        <div className="bg-primary text-white p-4 d-flex flex-column" style={{ width: "250px" }}>
            <h3 className="fw-bold mb-4">eCampus 🎓</h3>
            <ul className="nav flex-column">
                <li className="nav-item mb-3">
                    <a href="#" className="nav-link text-white">
                        <i className="bi bi-house-door-fill me-2"></i> Dashboard
                    </a>
                </li>
                <li className="nav-item mb-3">
                    <Link to="/studdrives" className="nav-link text-white">
                        <i className="bi bi-briefcase-fill me-2"></i> Drives
                    </Link>
                </li>
                <li className="nav-item mb-3">
                    <a href="#profile" className="nav-link text-white">
                        <i className="bi bi-person-lines-fill me-2"></i> Profile
                    </a>
                </li>
                <li className="nav-item mt-auto">
                    <a href="#" className="nav-link text-white" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </a>
                </li>
            </ul>
        </div>

    )
}

export default SsideBar
