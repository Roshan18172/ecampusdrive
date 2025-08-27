import React,{useState,useEffect} from 'react'

const TeacherProfile = () => {
    const [user, setUser] = useState([]);
    
        useEffect(() => {
            const fetchUser = async () => {
                try {
                    const res = await fetch("http://localhost:5000/api/student/teacher", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": localStorage.getItem("token"), // 👈 token stored after login
                        },
                    });
    
                    const data = await res.json();
                    setUser(data);
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            };
            fetchUser();
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
          <h3 className="mb-1">{user.name}</h3>
          <span className="badge bg-primary">{localStorage.getItem("role")}</span>
        </div>

        <hr />

        <div className="mb-3">
          <p><strong>Email:</strong> {user.email}</p>
          {user.department && <p><strong>Department:</strong> {user.department}</p>}
          {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
          {/* {profile.profile.course && <p><strong>Course:</strong> {profile.profile.course}</p>}
          {profile.profile.year && <p><strong>year:</strong> {profile.profile.year}</p>}
          {profile.profile.skills && <p><strong>skills:</strong> {profile.profile.skills}</p>} */}
        </div>

      </div>
    </div>
  )
}

export default TeacherProfile
