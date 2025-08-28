import React,{useEffect,useState} from 'react'
import axios from 'axios';

const StudProfile = () => {
     const [profile, setProfile] = useState({
            course: "",
            year: "",
            skills: "",
        });
        useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token"); // assuming JWT stored
                const res = await axios.get("http://localhost:5000/api/student/profile", {
                    headers: { "auth-token": token },
                });
                setProfile(res.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "55vh" }}>
      <div className="card shadow-lg p-4 rounded" style={{ maxWidth: "500px", width: "100%" }}>
        
        <div className="text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="profile"
            className="rounded-circle mb-3"
            width="100"
          />
          <h3 className="mb-1">{profile.name}</h3>
          <span className="badge bg-primary">{localStorage.getItem("role")}</span>
        </div>

        <hr />

        <div className="mb-3">
          <p><strong>Email :</strong> {profile.email}</p>
          {profile.department && <p><strong>Department :</strong> {profile.department}</p>}
          {profile.phone && <p><strong>Phone:</strong> {profile.phone}</p>}
          {/* {profile.profile.year && <p><strong>year:</strong> {profile.profile.year}</p>} */}
          {profile.appliedDrives && <p><strong>Applied Drives :</strong> {profile.appliedDrives.length}</p>}
          {/* {profile.profile.course && <p><strong>Course:</strong> {profile.profile.course}</p>}
          {profile.profile.skills && <p><strong>skills:</strong> {profile.profile.skills}</p>} */}
        </div>

      </div>
    </div>
  )
}

export default StudProfile
