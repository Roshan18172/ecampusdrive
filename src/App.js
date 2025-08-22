import React from "react";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import About from "./components/About";
import Drives from "./components/Drives";
import Contact from "./components/Contact";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
// import StudentProfile from "./components/StudentProfile";
// import TeacherProfile, Drives, Login, Register etc.

function App() {
const user = JSON.parse(localStorage.getItem("user")); // {role: "student"/"teacher"}

  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/drives" element={<Drives />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route
            path="/student/dashboard"
            element={user?.role === "student" ? <StudentDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/teacher/dashboard"
            element={user?.role === "teacher" ? <TeacherDashboard /> : <Navigate to="/login" />}
          />
          {/* <Route path="/student/profile" element={<StudentProfile />} /> */}
          {/* Add other routes: TeacherProfile, Login, Register, Drives */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
