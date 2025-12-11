import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "./API.jsx";

const ContactList = () => {
    const [contacts, setContacts] = useState([]);

    const loadContacts = async () => {
        const res = await API.get("/readcontact");
        setContacts(res.data);
    };

    const deleteContact = async (id) => {
        await API.delete(`/deletecontact/${id}`);
        loadContacts();
    };

    useEffect(() => {
        loadContacts();
    }, []);

    return (
        <div className="mt-4">
            <h3>Your Contacts</h3>

            <table className="table table-bordered mt-2">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {contacts.map((c) => (
                        <tr key={c._id}>
                            <td>{c.cname}</td>
                            <td>{c.cnumber}</td>
                            <td>
                                <Link className="btn btn-warning btn-sm me-2" to={`/update/${c._id}`}>
                                    Edit
                                </Link>

                                <button className="btn btn-danger btn-sm"
                                        onClick={() => deleteContact(c._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default ContactList;
