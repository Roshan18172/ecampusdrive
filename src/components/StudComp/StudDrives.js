import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import SsideBar from './SsideBar';

const StudDrives = () => {
    const [drives, setDrives] = useState([]);
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
    return (
        <div className="d-flex vh-100">
            <SsideBar />
            <div className="flex-grow-1 bg-light p-4">
                <p className="text-muted">Here are the latest placement drives for you</p>
                <div className="row mt-4">
                    {/* Drives Section */}
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
            </div>
        </div>
    )
}

export default StudDrives
