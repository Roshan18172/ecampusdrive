import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentDashboard = () => {
    const [drives, setDrives] = useState([]);
    const [profile, setProfile] = useState({
        course: "",
        year: "",
        skills: "",
    });
    const [message, setMessage] = useState("");

    // ✅ Fetch drives from backend
    useEffect(() => {
        const fetchDrives = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/drive/");
                setDrives(res.data);
            } catch (error) {
                console.error("Error fetching drives:", error);
            }
        };

        fetchDrives();
    }, []);

    // ✅ Fetch student profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token"); // assuming JWT stored
                const res = await axios.get("http://localhost:5000/api/student/profile", {
                    headers: { "auth-token": token },
                });
                setProfile(res.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    // ✅ Handle Profile Update
    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

     const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login"; // redirect to login
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const res = await axios.put(
                "http://localhost:5000/api/student/update",
                profile,
                {
                    headers: { "auth-token": token },
                }
            );
            setMessage("Profile updated successfully ✅");
        } catch (error) {
            setMessage("Error updating profile ❌");
        }
    };

    return (
        <div className="d-flex vh-100">
            {/* Sidebar */}
            <div
                className="bg-primary text-white p-4 d-flex flex-column"
                style={{ width: "250px" }}
            >
                <h3 className="fw-bold mb-4">eCampus 🎓</h3>
                <ul className="nav flex-column">
                    <li className="nav-item mb-3">
                        <a href="#" className="nav-link text-white">
                            <i className="bi bi-house-door-fill me-2"></i> Dashboard
                        </a>
                    </li>
                    <li className="nav-item mb-3">
                        <a href="#" className="nav-link text-white">
                            <i className="bi bi-briefcase-fill me-2"></i> Drives
                        </a>
                    </li>
                    <li className="nav-item mb-3">
                        <a href="#profile" className="nav-link text-white">
                            <i className="bi bi-person-lines-fill me-2"></i> Profile
                        </a>
                    </li>
                    <li className="nav-item mt-auto">
                        <a href="#" className="nav-link text-white"  onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right me-2"></i> Logout
                        </a>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1 bg-light p-4">
                <h2 className="fw-bold">Welcome, Student {profile.name} 👋</h2>
                <p className="text-muted">Here are the latest placement drives for you</p>

                {/* Drives Section */}
                <div className="row mt-4">
                    {drives.length > 0 ? (
                        drives.map((drive) => (
                            <div className="col-md-4 mb-4" key={drive._id}>
                                <div className="card shadow-sm border-0">
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold">{drive.title}</h5>
                                        <p className="card-text text-muted">
                                            Eligibility: {drive.eligibility} <br />
                                            Package: {drive.packageOffered}
                                        </p>
                                        <button
                                            className="btn btn-primary w-100"
                                            onClick={async () => {
                                                try {
                                                    const token = localStorage.getItem("token");
                                                    await axios.post(`http://localhost:5000/api/drive/apply/${drive._id}`, {}, {
                                                        headers: { "auth-token": token },
                                                    });
                                                    alert("Applied successfully ✅");
                                                } catch (err) {
                                                    alert("Error applying ❌");
                                                }
                                            }}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No drives available</p>
                    )}
                </div>

                {/* Profile Update Section */}
                <div id="profile" className="card shadow-sm border-0 p-4 mt-5">
                    <h4 className="fw-bold mb-3">Update Profile</h4>
                    {message && <div className="alert alert-info">{message}</div>}
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <label className="form-label">Course</label>
                            <input
                                type="text"
                                className="form-control"
                                name="course"
                                value={profile.course}
                                onChange={handleChange}
                                placeholder="e.g. B.Tech, MBA"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Year</label>
                            <input
                                type="text"
                                className="form-control"
                                name="year"
                                value={profile.year}
                                onChange={handleChange}
                                placeholder="e.g. 3rd Year"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Skills</label>
                            <input
                                type="text"
                                className="form-control"
                                name="skills"
                                value={profile.skills}
                                onChange={handleChange}
                                placeholder="e.g. React, Node.js, Java"
                            />
                        </div>
                        <button className="btn btn-success">Update Profile</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
