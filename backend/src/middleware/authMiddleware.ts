import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebaseAdmin';

export interface AuthRequest extends Request {
    user?: admin.auth.DecodedIdToken;
}

export const authenticateUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    console.log('Auth Middleware: Received header:', authHeader ? authHeader.substring(0, 20) + '...' : 'None');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.error('Auth Middleware: No token provided');
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        console.log('Auth Middleware: Token verified for user', decodedToken.uid);
        next();
    } catch (error) {
        console.error('Error verifying auth token:', error);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
};
