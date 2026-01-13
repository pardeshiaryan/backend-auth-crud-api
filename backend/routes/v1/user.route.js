import { Router } from 'express';
import { User } from '../../models/user.model.js';
import { registerUser, loginUser } from '../../controllers/user.js';
import { authMiddleware } from '../../middleware/auth.js';

const userRoute = Router();

userRoute.get('/health-check', (req, res) => {
    console.log('Health check route accessed');
    res.status(200).send('OK');
});

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);


userRoute.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

 

export default userRoute;