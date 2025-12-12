import { Link, useNavigate } from "react-router-dom";
import ContactList from "./ContactList.jsx";

const Dashboard = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="container">
            <div className="top-bar">
                <h2>Your Contacts</h2>
                <button className="btn btn-danger" style={{ width: "100px" }} onClick={logout}>
                    Logout
                </button>
            </div>

            <Link to="/add" className="btn btn-primary">
                + Add Contact
            </Link>

            <ContactList />
        </div>
    );
};

export default Dashboard;
