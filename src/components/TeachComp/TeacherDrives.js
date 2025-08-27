import React, { useState, useEffect } from 'react'
import axios from 'axios';
import TsideBar from './TsideBar';

const TeacherDrives = () => {
    const [drives, setDrives] = useState([]);
    // ✅ Fetch teacher drives
    useEffect(() => {
        const fetchDrives = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/api/drive/", {
                    headers: { "auth-token": token },
                });
                setDrives(res.data);
            } catch (error) {
                console.error("Error fetching teacher drives:", error);
            }
        };

        fetchDrives();
    }, []);
    const [user, setUser] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/student/teacher", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token"), // 👈 token stored after login
                    },
                });

                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);
    return (
        <div className="d-flex vh-100">
            {/* Sidebar */}
            <TsideBar />
            {/* Main Content */}
            <div className="flex-grow-1 bg-light p-4">
                <h2 className="fw-bold">Welcome, {user.name} 👩‍🏫</h2>
                <p className="text-muted">Manage your drives and applicants here</p>
                <div className="row mt-4">
                    {drives.length > 0 ? (
                        drives.map((drive) => (
                            <div className="col-md-6 mb-4" key={drive._id}>
                                <div className="card shadow-sm border-0">
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold">{drive.title}</h5>
                                        <p className="card-text text-muted">
                                            {drive.description}
                                            <br />
                                            Eligibility: {drive.eligibility}
                                            <br />
                                            Package: {drive.packageOffered}
                                        </p>
                                        <button className="btn btn-outline-primary w-100">View Applicants</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No drives created yet</p>
                    )}
                </div>
            </div>
        </div>

    )
}

export default TeacherDrives
