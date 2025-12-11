import { useEffect, useState } from "react";
import API from "./API.jsx";
import { useNavigate, useParams } from "react-router-dom";

const UpdateContact = () => {
    const { id } = useParams();
    const [cname, setCname] = useState("");
    const [cnumber, setCnumber] = useState("");

    const navigate = useNavigate();

    const loadData = async () => {
        const res = await API.get("/readcontact");
        const contact = res.data.find((c) => c._id === id);

        if (contact) {
            setCname(contact.cname);
            setCnumber(contact.cnumber);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const update = async () => {
        await API.put(`/updatecontact/${id}`, { cname, cnumber });
        alert("Updated!");
        navigate("/dashboard");
    };

    return (
        <div className="container">
            <h2>Update Contact</h2>

            <input value={cname} className="form-control"
                onChange={(e) => setCname(e.target.value)} />

            <input value={cnumber} className="form-control mt-2"
                onChange={(e) => setCnumber(e.target.value)} />

            <button className="btn btn-success mt-3" onClick={update}>
                Save
            </button>
        </div>
    );
};

export default UpdateContact;
