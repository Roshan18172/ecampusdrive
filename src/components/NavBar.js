import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
   // check if user logged in
    const role = localStorage.getItem("role"); // "student" or "teacher"

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">eCampus</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">

                        {localStorage.getItem("token") && role === "student" && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/student">My Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/drives">Drives</Link>
                                </li>
                            </>
                        )}

                        {localStorage.getItem("token") && role === "teacher" && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/teacher/profile">My Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/teacher/drives">Manage Drives</Link>
                                </li>
                            </>
                        )}

                        {!localStorage.getItem("token") && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about">About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/drives">Drives</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact">Contact</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        ) }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
