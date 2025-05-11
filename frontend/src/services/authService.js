import axios from "axios";

// Backend API URL
const API_URL = "http://localhost:5000/api/auth";

// Signup function (user or admin based on backend logic)
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData, { withCredentials: true });
    return response.data; // Expected: { message, user: { id, email, role }, token }
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error;
  }
};

// Login function (supports admin or user)
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData, { withCredentials: true });
    
    // Store token and role in localStorage for later use
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role); // "admin" or "user"

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// Logout function
export const logout = async () => {
  try {
    const response = await axios.get(`${API_URL}/logout`, { withCredentials: true });
    
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    return response.data;
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    throw error;
  }
};
