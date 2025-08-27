import React, { useEffect, useState } from "react";
import TsideBar from "./TsideBar";
import TeacherProfile from "./TeacherProfile";

const TeacherDashboard = () => {
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
                <TeacherProfile />
            </div>
        </div>
    );
};

export default TeacherDashboard;
