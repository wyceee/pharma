import express from 'express';
import { body, validationResult } from 'express-validator';
import { login } from '../service/authService.js';

const router = express.Router();

router.post('/login', [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            const response = await login(email, password);
            res.status(200).json(response);
        } catch (err) {
            res.status(401).json({ message: err.message });
        }
    }
]);

export default router;