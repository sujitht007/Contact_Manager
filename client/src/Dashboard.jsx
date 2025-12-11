import { Link, useNavigate } from "react-router-dom";
import ContactList from "./ContactList.jsx";

const Dashboard = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="container mt-3">
            <h2>Contact Manager</h2>

            <button className="btn btn-danger float-end" onClick={logout}>
                Logout
            </button>

            <Link to="/add" className="btn btn-primary mt-3">
                Add Contact
            </Link>

            <ContactList />
        </div>
    );
};

export default Dashboard;
