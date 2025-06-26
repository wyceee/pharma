import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import { roleMap } from '../model/roleMap.js';

export const login = async (email, password) => {
    const user = await User.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
        const roleInfo = roleMap[user.role];
        if (!roleInfo) throw new Error('No config found for user role');

        const tokenPayload = {
            email: user.email,
            role: user.role,
            identityName: roleInfo.identityName
        };

        const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: '6h' });

        return {
            message: 'Login successful',
            token,
            email: user.email,
            role: user.role,
            identityName: roleInfo.identityName,
            org: roleInfo.org,
            walletDir: roleInfo.walletDir
        };
    } else {
        throw new Error('Invalid email or password');
    }
};