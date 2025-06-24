import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../model/User.js";

export const login = async (email, password) => {
    const user = await User.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email, role: user.role }, process.env.SECRET_KEY, { expiresIn: '6h' });
        return { message: 'Login successful', token, email: user.email, role: user.role };
    } else {
        throw new Error('Invalid email or password');
    }
};
