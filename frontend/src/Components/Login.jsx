import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
     
        useEffect(() => {
            const token = localStorage.getItem("token");
    
            if (token) {
                navigate("/dashboard");
                
            }
        },[])
    const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post("http://localhost:5000/api/auth/login", {
            email,
            password,
        }, { withCredentials: true });

        // Store token and role in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.user.role);  // Set user role

        // Redirect based on role
        if (response.data.user.role === "admin") {
            navigate("/admin/dashboard");
        } else {
            navigate("/dashboard");
        }
    } catch (error) {
        const message = error.response?.data?.message || "Login failed. Please try again.";
        setErrorMessage(message);
    }
};

    return (
        <form onSubmit={handleLogin}>
            <div className="Login-container">
                <div id="header">
                    <div className="text">Login</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message if exists */}

                    <div className="input">
                        <label className="hello">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input">
                        <label className="hello">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="forgot-password">
                        Forgot Password? <span><a href="/signup">Click Here</a></span>
                    </div>

                    <div className="submit-container">
                        <button className="submit" type="submit">Login</button>
                        <Link className="submit toggle" to="/signup">Switch to Sign Up</Link>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Login;
