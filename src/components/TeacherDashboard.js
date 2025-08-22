import React, { useEffect, useState } from "react";
import axios from "axios";

const TeacherDashboard = () => {
    const [drives, setDrives] = useState([]);
    const [newDrive, setNewDrive] = useState({
        title: "",
        description: "",
        eligibility: "",
        packageOffered: "",
    });
    const [message, setMessage] = useState("");

    // ✅ Fetch teacher drives
    useEffect(() => {
        const fetchDrives = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:5000/api/drive/mydrives", {
                    headers: { "auth-token": token },
                });
                setDrives(res.data);
            } catch (error) {
                console.error("Error fetching teacher drives:", error);
            }
        };

        fetchDrives();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login"; // redirect to login
    };

    // ✅ Handle form input
    const handleChange = (e) => {
        setNewDrive({ ...newDrive, [e.target.name]: e.target.value });
    };

    // ✅ Create new drive
    const handleCreateDrive = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                "http://localhost:5000/api/drive/create",
                newDrive,
                { headers: { "auth-token": token } }
            );
            setMessage("Drive created successfully ✅");
            setDrives([...drives, res.data]); // Add new drive instantly
            setNewDrive({ title: "", description: "", eligibility: "", packageOffered: "" });
        } catch (error) {
            setMessage("Error creating drive ❌");
        }
    };

    return (
        <div className="d-flex vh-100">
            {/* Sidebar */}
            <div
                className="bg-dark text-white p-4 d-flex flex-column"
                style={{ width: "250px" }}
            >
                <h3 className="fw-bold mb-4">eCampus 🎓</h3>
                <ul className="nav flex-column">
                    
                    <li className="nav-item mb-3">
                        <a href="#" className="nav-link text-white">
                            <i className="bi bi-clipboard2-fill me-2"></i> My Drives
                        </a>
                    </li>
                    <li className="nav-item mb-3">
                        <a href="#create" className="nav-link text-white">
                            <i className="bi bi-plus-circle-fill me-2"></i> Create Drive
                        </a>
                    </li>
                    <li className="nav-item mt-auto">
                        <a href="#" className="nav-link text-white" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right me-2"></i> Logout
                        </a>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1 bg-light p-4">
                <h2 className="fw-bold">Welcome, Teacher 👩‍🏫</h2>
                <p className="text-muted">Manage your drives and applicants here</p>

                {/* Drives List */}
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
                                        <button className="btn btn-outline-primary w-100">
                                            View Applicants
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No drives created yet</p>
                    )}
                </div>

                {/* Create Drive Section */}
                <div id="create" className="card shadow-sm border-0 p-4 mt-5">
                    <h4 className="fw-bold mb-3">Create New Drive</h4>
                    {message && <div className="alert alert-info">{message}</div>}
                    <form onSubmit={handleCreateDrive}>
                        <div className="mb-3">
                            <label className="form-label">Drive Title</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={newDrive.title}
                                onChange={handleChange}
                                placeholder="e.g. Infosys Campus Drive"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                name="description"
                                value={newDrive.description}
                                onChange={handleChange}
                                placeholder="Enter drive details"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Eligibility</label>
                            <input
                                type="text"
                                className="form-control"
                                name="eligibility"
                                value={newDrive.eligibility}
                                onChange={handleChange}
                                placeholder="e.g. B.Tech, MBA"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Package Offered</label>
                            <input
                                type="text"
                                className="form-control"
                                name="packageOffered"
                                value={newDrive.packageOffered}
                                onChange={handleChange}
                                placeholder="e.g. 6 LPA"
                                required
                            />
                        </div>
                        <button className="btn btn-success">Create Drive</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
