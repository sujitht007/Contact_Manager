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
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                {contacts.map((c) => (
                    <tr key={c._id}>
                        <td>{c.cname}</td>
                        <td>{c.cnumber}</td>
                        <td>
                            <Link
                                to={`/update/${c._id}`}
                                className="btn btn-warning table-btn"
                                style={{ marginRight: "5px" }}
                            >
                                Edit
                            </Link>

                            <button
                                className="btn btn-danger table-btn"
                                onClick={() => deleteContact(c._id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ContactList;
