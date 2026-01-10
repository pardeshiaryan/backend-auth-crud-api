import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const dbURI = process.env.DB_URI ;

export const db = async () => {
    try {
        await mongoose.connect(dbURI, {
            
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }   

};
