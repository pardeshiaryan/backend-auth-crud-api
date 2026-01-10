import express from 'express';
import cors from 'cors';
const app = express();
import routes from '../routes/v1/index.js';
import dotenv from 'dotenv';
dotenv.config();

// Middleware
app.use(express.json());

// enable cors
app.use(cors());


app.use('/v1', routes);
// module.exports = app;
export default app;