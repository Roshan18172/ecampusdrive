import React, { useEffect, useState } from "react";
import axios from "axios";

const Drives = () => {
    const [drives, setDrives] = useState([]);

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

    return (
        <div className="container py-5">
            {/* Heading */}
            <div className="text-center mb-5">
                <h1 className="fw-bold text-primary">💼 Campus Drives</h1>
                <p className="text-muted">
                    Explore the latest placement opportunities and apply to kickstart your career.
                </p>
            </div>

            {/* Drives Grid */}
            <div className="row">
                {drives.length > 0 ? (
                    drives.map((drive) => (
                        <div className="col-md-4 mb-4" key={drive._id}>
                            <div className="card h-100 shadow-lg border-0 rounded-4">
                                <div className="card-body d-flex flex-column">
                                    <h4 className="card-title text-success fw-bold">{drive.title}</h4>
                                    <p className="card-text text-muted">{drive.description}</p>

                                    <ul className="list-group list-group-flush mb-3">
                                        <li className="list-group-item">
                                            <strong>Eligibility:</strong> {drive.eligibility}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Package:</strong> {drive.packageOffered}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Date:</strong>{" "}
                                            {new Date(drive.postedAt).toLocaleDateString()}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Posted By:</strong> {drive.postedBy?.name || "Unknown"}
                                        </li>
                                    </ul>

                                    <button className="btn btn-primary mt-auto rounded-pill">
                                        Apply Now 🚀
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted">No drives available right now.</p>
                )}
            </div>
        </div>
    );
};

export default Drives;
