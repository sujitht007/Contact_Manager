import { useState } from "react";
import API from "./API.jsx";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await API.post("/register", { username, email, password });
            alert("Registration Successful!");
            navigate("/");
        } catch (error) {
            alert("Username or Email Already Exists");
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>

            <input
                type="text"
                className="form-control"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="email"
                className="form-control mt-2"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                className="form-control mt-2"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-success mt-3" onClick={handleRegister}>
                Create Account
            </button>

            <p className="mt-2">
                Already registered? <Link to="/">Login</Link>
            </p>
        </div>
    );
};

export default Register;
