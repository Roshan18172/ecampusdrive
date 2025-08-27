import React, { useEffect, useState } from "react";
import axios from "axios";
import SsideBar from "./SsideBar";
import StudProfile from "./StudProfile";

const StudentDashboard = () => {
    
    const [profile, setProfile] = useState({
        course: "",
        year: "",
        skills: "",
    });

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


    return (
        <div className="d-flex vh-100">
            {/* Sidebar */}
            <SsideBar/>
            {/* Main Content */}
            <div className="flex-grow-1 bg-light p-4">
                <h2 className="fw-bold">Welcome {profile.name} 👋</h2>
                <StudProfile   />
            </div>
        </div>
    );
};

export default StudentDashboard;
