import { useState, useEffect } from "react";
import { signup } from "../services/authService";
import { Link, useParams, useNavigate } from "react-router-dom";
import './Signup.css';

const Signup = () => {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const { id } = useParams();  // Assuming you pass the email as 'id' in the route
    const navigate = useNavigate();

      useEffect(() => {
            const token = localStorage.getItem("token");
    
            if (token) {
                navigate("/dashboard");
            }
        },[])
        
    // Set the email value if the 'id' parameter exists in the URL
    useEffect(() => {
        if (id) {
            setForm((prevForm) => ({ ...prevForm, email: id }));
        }
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(form);  // Calling signup service with form data
            alert("User registered successfully!");
            navigate('/login');  // Navigate to login page after successful signup
        } catch (error) {
            console.error("Signup failed:", error.response?.data || error.message);
            alert("Signup failed. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="Signup-container">
                <div id="header">
                    <div className="text">Sign Up</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <label className="hello">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                            value={form.username}
                        />
                    </div>

                    <div className="input">
                        <label className="hello">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            value={form.email}  // Directly using form state value
                        />
                    </div>

                    <div className="input">
                        <label className="hello">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={form.password}
                        />
                    </div>
                    <div className="submit-container">
                        <button className="submit" type="submit">Signup</button>

                        <Link className="submit toggle" to="/login">Switch to Login</Link>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Signup;
