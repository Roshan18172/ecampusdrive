import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import About from "./components/pages/About";
import Drives from "./components/pages/Drives";
import Contact from "./components/pages/Contact";
import StudentDashboard from "./components/StudComp/StudentDashboard";
import TeacherDashboard from "./components/TeachComp/TeacherDashboard";
import StudDrives from "./components/StudComp/StudDrives";
import UpdateStudProf from "./components/StudComp/UpdateStudProf";
import CreateDrive from "./components/TeachComp/CreateDrive";
import TeacherDrives from "./components/TeachComp/TeacherDrives";
import DriveApplicants from "./components/TeachComp/DriveApplicants";


function App() {
  // const user = JSON.parse(localStorage.getItem("user")); // {role: "student"/"teacher"}

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
          <Route path="/studdrives" element={<StudDrives />} />
          <Route path="/upStud" element={<UpdateStudProf />} />
          <Route path="/createDrive" element={<CreateDrive />} />
          <Route path="/Tdrives" element={<TeacherDrives />} />
          <Route path="/Dapplicants/:id" element={<DriveApplicants />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
