import React from "react";

const Contact = () => {
    return (
        <div className="container py-5">
            {/* Header */}
            <div className="text-center mb-5">
                <h1 className="fw-bold text-primary">📞 Contact Us</h1>
                <p className="text-muted">
                    Have questions about eCampus? Reach out to us anytime.
                </p>
            </div>

            <div className="row g-4">
                {/* Contact Info */}
                <div className="col-md-5">
                    <div className="p-4 shadow-lg rounded-4 bg-light">
                        <h4 className="fw-bold mb-3">Get in Touch</h4>
                        <p><i className="bi bi-envelope text-primary"></i> support@ecampus.com</p>
                        <p><i className="bi bi-telephone text-success"></i> +91 98765 43210</p>
                        <p><i className="bi bi-geo-alt text-danger"></i> Bengaluru, India</p>
                        <hr />
                        <h5 className="fw-bold">Follow Us</h5>
                        <div>
                            <a href="/facebook" className="me-3 fs-4 text-primary"><i className="bi bi-facebook"></i></a>
                            <a href="/twitter" className="me-3 fs-4 text-info"><i className="bi bi-twitter"></i></a>
                            <a href="/instagram" className="fs-4 text-danger"><i className="bi bi-instagram"></i></a>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="col-md-7">
                    <div className="p-4 shadow-lg rounded-4">
                        <h4 className="fw-bold mb-3">Send us a Message</h4>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Your Name</label>
                                <input type="text" className="form-control" placeholder="Enter your name" required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input type="email" className="form-control" placeholder="Enter your email" required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Message</label>
                                <textarea className="form-control" rows="4" placeholder="Write your message..." required></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary rounded-pill px-4">
                                Send Message 🚀
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
