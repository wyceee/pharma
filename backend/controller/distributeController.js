import express from 'express';
import { shipProduct } from '../service/contractService.js';

const router = express.Router();

// POST /api/distribute/ship - Ship a product
router.post('/distribute', async (req, res) => {
    const { identityName, batchNumber, distributor, temperatureChecks, shipDate } = req.body;
    if (!identityName || !batchNumber || !distributor || !temperatureChecks || !shipDate) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const result = await shipProduct(identityName, batchNumber, distributor, temperatureChecks, shipDate);
        res.status(201).json({ message: 'Product shipped', result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;

