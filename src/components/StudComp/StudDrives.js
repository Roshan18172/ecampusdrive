import React, { useState, useEffect } from "react";
import axios from "axios";
import SsideBar from "./SsideBar";

const StudDrives = () => {
    const [drives, setDrives] = useState([]);
    const [appliedDrives, setAppliedDrives] = useState([]); // store applied drive ids

    useEffect(() => {
    const fetchDrives = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/drive/");
            setDrives(res.data);

            const token = localStorage.getItem("token");
            if (token) {
                const appliedRes = await axios.get("http://localhost:5000/api/drive/applied", {
                    headers: { "auth-token": token },
                });
                setAppliedDrives(appliedRes.data); // now array of IDs ✅
            }
        } catch (error) {
            console.error("Error fetching drives:", error);
        }
    };

    fetchDrives();
}, []);

    const handleApply = async (driveId) => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                `http://localhost:5000/api/drive/apply/${driveId}`,
                {},
                { headers: { "auth-token": token } }
            );

            if (res.data.success) {
                setAppliedDrives((prev) => [...prev, driveId]);
                alert("Applied successfully ✅");
            }
        } catch (err) {
            if (err.response?.data?.error === "Already applied") {
                alert("⚠️ You already applied for this drive");
            } else {
                alert("Error applying ❌");
            }
        }
    };

    return (
        <div className="d-flex vh-100">
            <SsideBar />
            <div className="flex-grow-1 bg-light p-4">
                <p className="text-muted">Here are the latest placement drives for you</p>
                <div className="row mt-4">
                    {drives.length > 0 ? (
                        drives.map((drive) => (
                            <div className="col-md-4 mb-4" key={drive._id}>
                                <div className="card shadow-sm border-0">
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold">{drive.title}</h5>
                                        <p className="card-text text-muted">
                                            Description: {drive.description}
                                            <br />
                                            Eligibility: {drive.eligibility} <br />
                                            Package: {drive.packageOffered}
                                        </p>
                                        <button
                                            className={`btn w-100 ${appliedDrives.includes(drive._id)
                                                    ? "btn-success"
                                                    : "btn-primary"
                                                }`}
                                            disabled={appliedDrives.includes(drive._id)}
                                            onClick={() => handleApply(drive._id)}
                                        >
                                            {appliedDrives.includes(drive._id) ? "Applied" : "Apply"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No drives available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudDrives;
