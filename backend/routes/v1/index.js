import express from 'express';
import userRoute from './user.route.js';
import noteRoute from './note.route.js';


const router = express.Router();

// Mount user-related routes (includes health check)
router.use('/user', userRoute);
router.use('/note',noteRoute);
export default router;