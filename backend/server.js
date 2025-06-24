import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authController from './controller/authController.js';

dotenv.config();

const app = express();
const PORT = 8085;

app.use(cors());
app.use(express.json());

app.use('/', authController);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
