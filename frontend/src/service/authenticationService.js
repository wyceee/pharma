import axios from 'axios';

const API_URL = 'http://localhost:8085/login';

export const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL, { email, password });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Login failed');
        } else {
            throw new Error('Network error');
        }
    }
};

export default {
  login
};