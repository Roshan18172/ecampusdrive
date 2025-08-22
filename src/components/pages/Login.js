import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "", role: "student" });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const json = await response.json();
            console.log(json);

            if (response.ok) {
                localStorage.setItem("token", json.authToken);
                localStorage.setItem("role", json.role);
                setMessage("Login successful ✅");

                // Redirect based on role
                if (json.role === "student") {
                    navigate("/student");
                } else {
                    navigate("/teacher");
                }
                window.location.reload();
            } else {
                setMessage(json.error || "Invalid credentials ❌");
            }
        } catch (error) {
            console.error("Login error:", error);
            setMessage("Something went wrong ❌");
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="container p-4 shadow rounded bg-white" style={{ maxWidth: "900px" }}>
                <div className="row g-0">
                    <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-success text-white p-5 rounded-start">
                        <h2 className="fw-bold">Welcome Back 👋</h2>
                        <p className="text-center">Login to continue exploring placement drives and opportunities.</p>
                        <i className="bi bi-person-circle fs-1 mt-3"></i>
                    </div>
                    <div className="col-md-6 p-5">
                        <h3 className="mb-4 fw-bold">Login</h3>
                        {message && <div className="alert alert-info">{message}</div>}
                        <form onSubmit={handleSubmit}>
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
                                    name="role"
                                    className="form-control"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-success w-100">Login</button>
                        </form>
                        <p className="mt-3 text-center">
                            Don’t have an account?{" "}
                            <Link to="/register" className="text-success fw-bold">Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
