import React, { useState, useEffect } from 'react'
import axios from 'axios';
import TsideBar from './TsideBar';

const TeacherDrives = () => {
    const [drives, setDrives] = useState([]);
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
                if (data.postedDrives && data.postedDrives.length > 0) {
                    const drivePromises = data.postedDrives.map((id) =>
                        axios.get(`http://localhost:5000/api/drive/${id}`, {
                            headers: { "auth-token": localStorage.getItem("token") }
                        })
                    );
                    const drivesRes = await Promise.all(drivePromises);
                    setDrives(drivesRes.map((res) => res.data));
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);
    // ✅ Handle delete
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this drive?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/drive/${id}`, {
                headers: { "auth-token": localStorage.getItem("token") }
            });
            setDrives(drives.filter((d) => d._id !== id)); // remove from UI
        } catch (error) {
            console.error("Error deleting drive:", error);
        }
    };

    // ✅ Handle edit (you can redirect to edit page)
    const handleEdit = (id) => {
        window.location.href = `/edit-drive/${id}`;
    };
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
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 className="card-title fw-bold mb-0">{drive.title}</h5>
                                            <div>
                                                <i className="bi bi-pencil-square text-primary me-3" style={{ cursor: "pointer" }}
                                                    onClick={() => handleEdit(drive._id)}
                                                ></i>
                                                <i className="bi bi-trash text-danger" style={{ cursor: "pointer" }}
                                                    onClick={() => handleDelete(drive._id)}
                                                ></i>
                                            </div>
                                        </div>
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
