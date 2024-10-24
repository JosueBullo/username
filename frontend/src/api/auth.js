// src/api/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Ensure this matches your backend

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};



export const loginUser = async (userData) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', userData);
    return response.data; // Return the response data
};
johnlawrence