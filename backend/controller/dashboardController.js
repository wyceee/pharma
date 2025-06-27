import express from "express";
import { getAllProducts } from '../service/contractService.js';

const router = express.Router();

// backend/controller/dashboardController.js

router.get('/dashboard-stats', async (req, res) => {
    try {
        const products = await getAllProducts('appManufacturer');
        let stats = {
            totalProducts: products.length,
            shippedProducts: products.filter(p => p.status === 'SHIPPED').length,
            pendingShipments: products.filter(p => p.status === 'CREATED').length
        };
        let recentActivity = [];
        products.forEach(product => {
            product.history.forEach((h, idx) => {
                let details = `Batch: ${product.batchNumber}`;
                if (h.action === 'CREATED') {
                    details += ` | Manufacturer: ${h.manufacturer}`;
                }
                if (h.action === 'SHIPPED') {
                    details += ` | Distributor: ${h.distributor || product.distributor}`;
                    if (h.temperatureChecks) details += ` | Temp: ${h.temperatureChecks}`;
                }
                if (h.action === 'INSPECTED') {
                    details += ` | Pharmacy: ${h.pharmacy}`;
                    if (h.remarks) details += ` | Remarks: ${h.remarks}`;
                }
                recentActivity.push({
                    id: `${product.batchNumber}-${idx}`,
                    action: h.action,
                    details,
                    time: h.shipDate || h.inspectionDate || product.manufactureDate || '',
                    product
                });
            });
        });
        res.json({ stats, recentActivity });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;