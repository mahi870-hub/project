import axios from "axios";

// Backend API URL
const API_URL = "http://localhost:5000/api/auth";

// Signup function
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data; // Return data if successful
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error; // Propagate error to be handled in the component
  }
};

// Login function
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData, { withCredentials: true });
    return response.data; // Return data if successful
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error; // Propagate error to be handled in the component
  }
};

// Logout function
export const logout = async () => {
  try {
    const response = await axios.get(`${API_URL}/logout`, { withCredentials: true });
    return response.data; // Return data if successful
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    throw error; // Propagate error to be handled in the component
  }
};
