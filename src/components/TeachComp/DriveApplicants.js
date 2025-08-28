import React, { useEffect, useState } from "react";
import {useParams,  useNavigate,useLocation } from "react-router-dom";
import axios from "axios";
import TsideBar from "./TsideBar";
import { Card, ListGroup, Spinner, Button } from "react-bootstrap";

const DriveApplicants = () => {
    // const location = useLocation();
    // const id = location.state
    const { id } = useParams(); // drive id from route
    // console.log(id) 
    const navigate = useNavigate();
    const [drive, setDrive] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDriveAndApplicants = async () => {
            try {
                // fetch drive details
                const driveRes = await axios.get(`http://localhost:5000/api/drive/${id}`, {
                    headers: { "auth-token": localStorage.getItem("token") },
                });
                console.log(driveRes.data)
                setDrive(driveRes.data);
                
                // fetch applicants
                // const applicantsRes = await axios.get(`http://localhost:5000/api/drive/applicants/${id}`, {
                //     headers: { "auth-token": localStorage.getItem("token") },
                // });
                // console.log(applicantsRes.data)

                setApplicants(driveRes.data.applicants);
                console.log(driveRes.data.applicants)
            } catch (error) {
                console.error("Error fetching applicants:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDriveAndApplicants();
    }, [id]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (!drive) {
        return <p className="text-center mt-5">Drive not found</p>;
    }

    return (
        <div className="d-flex vh-100">
            {/* Sidebar */}
            <TsideBar />
            {/* Main Content */}
            <div className="flex-grow-1 p-4 bg-light overflow-auto">
                {/* Back button */}
                <Button variant="secondary" className="mb-4" onClick={() => navigate("/Tdrives")}> ← Back to Drives </Button>
                <h2 className="fw-bold mb-4">Drive Details</h2>
                <Card className="mb-4 shadow-sm border-0">
                    <Card.Body>
                        <Card.Title className="fw-bold">{drive.title}</Card.Title>
                        <Card.Text>
                            <strong>Description:</strong> {drive.description} <br />
                            <strong>Eligibility:</strong> {drive.eligibility} <br />
                            <strong>Package:</strong> {drive.packageOffered}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <h3 className="fw-bold mb-3">Applicants</h3>
                {applicants.length > 0 ? (
                    <ListGroup>
                        {applicants.map((applicant, idx) => (
                            <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{applicant}</strong><br/>
                                    <strong>{applicant.name}</strong> <br />
                                    <small>{applicant.email}</small>
                                </div>
                                <a href={applicant.profile} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary">
                                    View Profile
                                </a>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <p className="text-muted">No applicants yet for this drive.</p>
                )}
            </div>
        </div>
    );
};

export default DriveApplicants;
