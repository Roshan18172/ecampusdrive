import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", formData);

            if (res.status === 200) {
                setMessage("Registration successful ✅ Redirecting to login...");

                // redirect to login page after short delay
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
        } catch (error) {
            setMessage("Error registering ❌");
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="container p-4 shadow rounded bg-white" style={{ maxWidth: "900px" }}>
                <div className="row g-0">
                    <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-primary text-white p-5 rounded-start">
                        <h2 className="fw-bold">Join eCampus 🚀</h2>
                        <p className="text-center">
                            Create your account and start your journey towards success.
                        </p>
                        <i className="bi bi-mortarboard-fill fs-1 mt-3"></i>
                    </div>
                    <div className="col-md-6 p-5">
                        <h3 className="mb-4 fw-bold">Register</h3>
                        {message && <div className="alert alert-info">{message}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Role</label>
                                <select
                                    className="form-select"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Register</button>
                        </form>
                        <p className="mt-3 text-center">
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary fw-bold">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
