import React ,{useState}from 'react'
import TsideBar from './TsideBar'
import axios from 'axios';

const CreateDrive = () => {
    const [drives, setDrives] = useState([]);
        const [newDrive, setNewDrive] = useState({
            title: "",
            description: "",
            eligibility: "",
            packageOffered: "",
        });
        const [message, setMessage] = useState("");
    // ✅ Handle form input
    const handleChange = (e) => {
        setNewDrive({ ...newDrive, [e.target.name]: e.target.value });
    };
    // ✅ Create new drive
        const handleCreateDrive = async (e) => {
            e.preventDefault();
            try {
                const token = localStorage.getItem("token");
                const res = await axios.post(
                    "http://localhost:5000/api/drive/create",
                    newDrive,
                    { headers: { "auth-token": token } }
                );
                setMessage("Drive created successfully ✅");
                setDrives([...drives, res.data]); // Add new drive instantly
                setNewDrive({ title: "", description: "", eligibility: "", packageOffered: "" });
            } catch (error) {
                setMessage("Error creating drive ❌");
            }
        };
    return (
        <div className="d-flex vh-100">
            {/* Sidebar */}
            <TsideBar />
            {/* Create Drive */}
            <div className="flex-grow-1 bg-light p-4">
                <div id="create" className="card shadow-sm border-0 p-4 mt-5">
                    <h4 className="fw-bold mb-3">Create New Drive</h4>
                    {message && <div className="alert alert-info">{message}</div>}
                    <form onSubmit={handleCreateDrive}>
                        <div className="mb-3">
                            <label className="form-label">Drive Title</label>
                            <input type="text" className="form-control" name="title" value={newDrive.title} onChange={handleChange} placeholder="e.g. Infosys Campus Drive" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" name="description" value={newDrive.description} onChange={handleChange} placeholder="Enter drive details" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Eligibility</label>
                            <input type="text" className="form-control" name="eligibility" value={newDrive.eligibility} onChange={handleChange} placeholder="e.g. B.Tech, MBA" required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Package Offered</label>
                            <input type="text" className="form-control" name="packageOffered" value={newDrive.packageOffered} onChange={handleChange} placeholder="e.g. 6 LPA" required />
                        </div>
                        <button className="btn btn-success">Create Drive</button>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default CreateDrive
