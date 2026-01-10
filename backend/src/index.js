import express from 'express';
import app from './app.js';
import { db } from '../config/db.js';
const PORT = process.env.PORT || 3000;


db();
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});