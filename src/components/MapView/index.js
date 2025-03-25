import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import "./index.css";

function MapView() {
    const [location, setLocation] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        // ✅ Redirect to login if token is missing
        if (!token) {
            navigate("/");
            return;
        }

        // ✅ Fetch map data if authenticated
        axios.get("https://backend-map-integration.onrender.com/api/map", { headers: { Authorization: token } })
            .then((res) => setLocation(res.data))
            .catch(() => {
                console.error("Error fetching map data");
                navigate("/"); // Redirect on error
            });
    }, [navigate]);

    return (
        <div className="map-container">
            {location ? (
                <MapContainer center={[location.lat, location.lon]} zoom={5} className="map">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[location.lat, location.lon]}>
                        <Popup>{location.name}</Popup>
                    </Marker>
                </MapContainer>
            ) : (
                <p>Please Login the page</p>
            )}
        </div>
    );
}

export default MapView;
