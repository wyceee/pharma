import axios from 'axios';

const API_URL = 'http://localhost:8085/api';

export const shipProduct = async (shipData) => {
    try {
        const response = await axios.post(`${API_URL}/distribute`, shipData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Failed to ship product');
        } else {
            throw new Error('Network error');
        }
    }
};

export default {
    shipProduct
}


