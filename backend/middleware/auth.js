import { verifyToken } from '../utils/jwt.js';

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = verifyToken(token);
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// RBAC Middleware - Role Based Access Control
export const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.userId || !req.userRole) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        if (!allowedRoles.includes(req.userRole)) {
            return res.status(403).json({ message: 'Access denied. Required role: ' + allowedRoles.join(' or ') });
        }

        next();
    };
};

