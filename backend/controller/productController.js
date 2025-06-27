import express from 'express';
import { createProduct } from '../service/contractService.js';

const router = express.Router();

router.post('/products', async (req, res) => {
    const { identityName, batchNumber, name, ingredients, manufacturer, manufactureDate, expiryDate } = req.body;
    if (!identityName || !batchNumber  || !name || !ingredients || !manufacturer || !manufactureDate || !expiryDate) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const result = await createProduct(identityName, batchNumber, name,  ingredients, manufacturer, manufactureDate, expiryDate);
        res.status(201).json({ message: 'Product created', result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
