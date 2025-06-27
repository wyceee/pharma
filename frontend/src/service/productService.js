import axios from 'axios';

const API_URL = 'http://localhost:8085/api';

export const getDashboardStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard-stats`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Failed to fetch dashboard stats');
    } else {
      throw new Error('Network error');
    }
  }
};

export default {
  getDashboardStats
};