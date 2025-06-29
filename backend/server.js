import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authController from './controller/authController.js';
import dashboardController from './controller/dashboardController.js';
import productController from './controller/productController.js';
import {initLedger} from "./service/contractService.js";
import distributeController from "./controller/distributeController.js";

dotenv.config();
const initApp = async () => {
    console.log("Initializing ledger...");
    await initLedger();
    const app = express();
    const PORT = 3000;

    app.use(cors());
    app.use(express.json());

    app.use('/', authController);
    app.use('/api', dashboardController);
    app.use('/api', productController);
    app.use('/api', distributeController);

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

initApp().catch(error => {
    console.error("Error initializing the application:", error);
    process.exit(1);
});