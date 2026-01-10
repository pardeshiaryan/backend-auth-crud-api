import mongoose from "mongoose";
import { User } from "./user.model.js";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
   
    status: {
        type: String,
        enum: ['done', 'pending'],
        default: 'pending',
    },
}, { timestamps: true });
export const Note = mongoose.model('Note', noteSchema);
