import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "./Home";


const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
 
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        // Axios request to fetch user data
        axios.get("http://localhost:5000/api/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                setUser(res.data);
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
                localStorage.removeItem("token");
                navigate("/login");
            });
    }, [navigate]);

   

    return (
        <>
            {user ? (
                <>
                    
                    <Home />
                   
                </>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default Dashboard;
