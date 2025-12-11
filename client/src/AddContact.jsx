import { useState } from "react";
import API from "./API.jsx";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
    const [cname, setCname] = useState("");
    const [cnumber, setCnumber] = useState("");

    const navigate = useNavigate();

    const saveContact = async () => {
        try {
            await API.post("/contact", { cname, cnumber });
            alert("Contact Added");
            navigate("/dashboard");
        } catch (error) {
            alert("Error adding contact");
        }
    };

    return (
        <div className="container">
            <h2>Add Contact</h2>

            <input className="form-control" placeholder="Name"
                onChange={(e) => setCname(e.target.value)} />

            <input className="form-control mt-2" placeholder="Phone Number"
                onChange={(e) => setCnumber(e.target.value)} />

            <button className="btn btn-success mt-3" onClick={saveContact}>
                Save
            </button>
        </div>
    );
};

export default AddContact;
