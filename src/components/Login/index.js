import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

function Login() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const { data } = await axios.post("https://backend-map-integration.onrender.com/api/login", credentials);
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="login">
            <h1>Map Integration</h1>
            <div className="login-container">
                {error && <p className="error">{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                />
                <button onClick={handleLogin}>Login</button>
            </div>
            <div className="user">
                Username: Adnan Ali
                Password: adnan@123
            </div>
        </div>
    );
}

export default Login;
