import express from 'express';
import userRoute from './user.route.js';


const router = express.Router();

// Mount user-related routes (includes health check)
router.use('/user', userRoute);

export default router;