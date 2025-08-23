import React, { useEffect, useState } from "react";
import axios from "axios";
import SsideBar from "./SsideBar";
import StudProfile from "./StudProfile";

const StudentDashboard = () => {
    const [drives, setDrives] = useState([]);
    const [profile, setProfile] = useState({
        course: "",
        year: "",
        skills: "",
    });
    const [message, setMessage] = useState("");

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
            <SsideBar/>
            {/* Main Content */}
            <div className="flex-grow-1 bg-light p-4">
                <h2 className="fw-bold">Welcome {profile.name} 👋</h2>
                <StudProfile handleUpdate={handleUpdate}  />

                {/* Profile Update Section */}
                <div id="profile" className="card shadow-sm border-0 p-4 mt-5">
                    <h4 className="fw-bold mb-3">Update Profile</h4>
                    {message && <div className="alert alert-info">{message}</div>}
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3">
                            <label className="form-label">Course</label>
                            <input type="text" className="form-control" name="course" value={profile.course} onChange={handleChange}
                                placeholder="e.g. B.Tech, MBA"/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Year</label>
                            <input type="text" className="form-control" name="year" value={profile.year} onChange={handleChange} placeholder="e.g. 3rd Year"
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Skills</label>
                            <input type="text" className="form-control" name="skills" value={profile.skills} onChange={handleChange} placeholder="e.g. React, Node.js, Java"
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
