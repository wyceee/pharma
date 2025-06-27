import axios from 'axios';

const API_URL = 'http://localhost:8085/api';

export const createProduct = async (productData) => {
    try {
        const response = await axios.post(`${API_URL}/products`, productData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Failed to create product');
        } else {
            throw new Error('Network error');
        }
    }
}

export const getAllProducts = async (identityName) => {
    try {
        const response = await axios.get(`${API_URL}/products/created`, {
            params: { identityName }
        });
        return response.data.products;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Failed to fetch products');
        } else {
            throw new Error('Network error');
        }
    }
}

export default {
    createProduct,
    getAllProducts
}
