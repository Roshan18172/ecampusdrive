import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <header className="bg-dark text-white text-center py-5">
                <div className="container">
                    <h1 className="display-4 fw-bold">Welcome to eCampus Drive 🚀</h1>
                    <p className="lead">
                        Your one-stop platform for campus placements, student opportunities, and teacher-driven hiring.
                    </p>
                    <div className="mt-4">
                        <Link to="/register" className="btn btn-primary btn-lg me-3">
                            Get Started
                        </Link>
                        <Link to="/login" className="btn btn-outline-light btn-lg">
                            Login
                        </Link>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-5">
                <div className="container">
                    <h2 className="text-center mb-4">Why Choose eCampus?</h2>
                    <div className="row">
                        <div className="col-md-4 text-center">
                            <div className="card shadow-sm p-4 border-0">
                                <i className="bi bi-mortarboard-fill text-primary fs-1 mb-3"></i>
                                <h5>For Students</h5>
                                <p>
                                    Build your profile, apply for drives, and track your placement journey with ease.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 text-center">
                            <div className="card shadow-sm p-4 border-0">
                                <i className="bi bi-person-workspace text-success fs-1 mb-3"></i>
                                <h5>For Teachers</h5>
                                <p>
                                    Post new drives, review applicants, and guide your students towards success.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4 text-center">
                            <div className="card shadow-sm p-4 border-0">
                                <i className="bi bi-building-check text-warning fs-1 mb-3"></i>
                                <h5>For Companies</h5>
                                <p>
                                    Access a pool of talented students and simplify the hiring process with eCampus.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-light py-5">
                <div className="container">
                    <h2 className="text-center mb-4">How It Works?</h2>
                    <div className="row text-center">
                        <div className="col-md-6 mb-4">
                            <div className="card shadow p-4 border-0">
                                <h4 className="fw-bold text-primary">Students</h4>
                                <p>
                                    Register → Complete Profile → Apply for Drives → Get Selected 🎉
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="card shadow p-4 border-0">
                                <h4 className="fw-bold text-success">Teachers</h4>
                                <p>
                                    Register → Post Drives → Review Applicants → Support Students 🚀
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <footer className="bg-dark text-white text-center py-4">
                <div className="container">
                    <h5>Join eCampus Drive Today</h5>
                    <p className="mb-2">Empowering Students | Guiding Teachers | Connecting Companies</p>
                    <Link to="/register" className="btn btn-primary">
                        Register Now
                    </Link>
                </div>
            </footer>
        </div>
    );
};

export default Home;
