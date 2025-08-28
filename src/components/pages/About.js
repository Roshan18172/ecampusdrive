import React from "react";

const About = () => {
    return (
        <div className="container py-5">
            {/* Title Section */}
            <div className="text-center mb-5">
                <h1 className="fw-bold text-primary">About eCampus Drive</h1>
                <p className="text-muted fs-5">
                    Empowering students and teachers with a seamless placement experience 🚀
                </p>
            </div>

            {/* Mission & Vision */}
            <div className="row align-items-center mb-5">
                <div className="col-md-6">
                    <img
                        src="https://www.hdwallpapers.in/download/city_buildings_architecture_modern_bridge_4k_hd-3840x2160.jpg"
                        alt="Mission"
                        className="img-fluid rounded shadow-lg"
                    />
                </div>
                <div className="col-md-6">
                    <h2 className="fw-bold text-dark">Our Mission</h2>
                    <p className="text-muted">
                        At <strong>eCampus</strong>, our mission is to bridge the gap between students and
                        career opportunities. We aim to provide a digital platform where teachers
                        can post drives and students can seamlessly apply and showcase their skills.
                    </p>
                    <h2 className="fw-bold text-dark mt-4">Our Vision</h2>
                    <p className="text-muted">
                        To become the most trusted campus placement solution that empowers
                        students to achieve their dreams and helps institutions manage
                        recruitment effortlessly.
                    </p>
                </div>
            </div>

            {/* Values Section */}
            <div className="text-center mb-5">
                <h2 className="fw-bold text-primary">Our Core Values</h2>
            </div>
            <div className="row text-center">
                <div className="col-md-4 mb-4">
                    <div className="card shadow border-0 h-100 p-4">
                        <i className="bi bi-mortarboard-fill fs-1 text-primary mb-3"></i>
                        <h5 className="fw-bold">Student First</h5>
                        <p className="text-muted">
                            Helping students get career-ready and land their dream jobs with ease.
                        </p>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card shadow border-0 h-100 p-4">
                        <i className="bi bi-people-fill fs-1 text-success mb-3"></i>
                        <h5 className="fw-bold">Collaboration</h5>
                        <p className="text-muted">
                            Teachers, students, and recruiters working together for success.
                        </p>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card shadow border-0 h-100 p-4">
                        <i className="bi bi-lightbulb-fill fs-1 text-warning mb-3"></i>
                        <h5 className="fw-bold">Innovation</h5>
                        <p className="text-muted">
                            Continuously improving to make campus placements smarter and simpler.
                        </p>
                    </div>
                </div>
            </div>

            {/* Closing */}
            <div className="text-center mt-5">
                <h4 className="fw-bold text-dark">Join us in shaping the future of campus placements 🌟</h4>
            </div>
        </div>
    );
};

export default About;
