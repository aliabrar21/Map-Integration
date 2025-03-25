import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

function Dashboard() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/");

        axios.get("https://backend-map-integration.onrender.com/api/dashboard", { headers: { Authorization: token } })
            .then((res) => {
                console.log("API Response:", res.data);
                if (res.data && res.data.cards && Array.isArray(res.data.cards.cards)) {
                    setData(res.data.cards.cards); // Access the 'cards' array correctly
                } else {
                    setData([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                navigate("/");
            });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="dashboard">
            {/* Dashboard Header */}
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            {/* Dashboard Content */}
            <div className="dashboard-container">
                {data.length > 0 ? (
                    data.map((card) => (
                        <div key={card.id} className="card" onClick={() => navigate(`/map`)}>
                            <h2>{card.popupText}</h2> {/* Corrected to use card.popupText */}
                            <img src={card.imageUrl} alt={card.popupText} style={{ maxWidth: '100px' }} />
                        </div>
                    ))
                ) : (
                    <p>No data available</p>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
