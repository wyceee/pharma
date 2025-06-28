import axios from 'axios';
import { API_URL_LOGIN } from './apiConfig';

export const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL_LOGIN, { email, password });
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