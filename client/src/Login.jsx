import { useState } from "react";
import API from "./API.jsx";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await API.post("/login", { username, password });
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (error) {
            alert("Invalid username or password");
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>

            <input
                type="text"
                placeholder="Username"
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                className="form-control mt-2"
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-primary mt-3" onClick={handleLogin}>
                Login
            </button>

            <p className="mt-2">
                Don’t have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};

export default Login;
