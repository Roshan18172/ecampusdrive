import React, { useState, useEffect } from 'react';
import {useNavigate } from "react-router-dom";
import axios from 'axios';
import TsideBar from './TsideBar';
import { Modal, Button, Form } from "react-bootstrap";

const TeacherDrives = () => {
    const navigate = useNavigate();
    const [drives, setDrives] = useState([]);
    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);
    const [selectedDrive, setSelectedDrive] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        eligibility: "",
        packageOffered: ""
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/student/teacher", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token"),
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
            setDrives(drives.filter((d) => d._id !== id));
        } catch (error) {
            console.error("Error deleting drive:", error);
        }
    };

    // ✅ Open Edit Modal
    const handleEdit = (drive) => {
        setSelectedDrive(drive);
        setFormData({
            title: drive.title,
            description: drive.description,
            eligibility: drive.eligibility,
            packageOffered: drive.packageOffered
        });
        setShow(true);
    };

    // ✅ Update Drive
    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/api/drive/${selectedDrive._id}`, formData, {
                headers: { "auth-token": localStorage.getItem("token") }
            });
            setShow(false);

            // refresh UI
            setDrives(drives.map(d => d._id === selectedDrive._id ? { ...d, ...formData } : d));
        } catch (err) {
            console.error("Error updating drive:", err);
        }
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
                                                <i className="bi bi-pencil-square text-primary me-3"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleEdit(drive)}></i>
                                                <i className="bi bi-trash text-danger"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => handleDelete(drive._id)}></i>
                                            </div>
                                        </div>
                                        <p className="card-text text-muted">
                                            {drive.description}
                                            <br />
                                            Eligibility: {drive.eligibility}
                                            <br />
                                            Package: {drive.packageOffered}
                                        </p>
                                        <button className="btn btn-outline-primary w-100" onClick={() => navigate(`/Dapplicants/${drive._id}`)}>View Applicants</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No drives created yet</p>
                    )}
                </div>
            </div>

            {/* ✅ Edit Modal */}
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Drive</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Eligibility</Form.Label>
                            <Form.Control
                                type="text"
                                name="eligibility"
                                value={formData.eligibility}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Package Offered</Form.Label>
                            <Form.Control
                                type="text"
                                name="packageOffered"
                                value={formData.packageOffered}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TeacherDrives;
