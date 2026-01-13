import { Note } from "../models/note.model.js";
import { User } from "../models/user.model.js";

export const createPost = async (req, res) => {
    try {
        const { title, content, status } = req.body;
        const userId = req.userId;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const newNote = new Note({
            title,
            content,
            status: status || 'pending',
            user: userId,
        });

        await newNote.save();
        
        res.status(201).json({
            message: 'Note created successfully',
            note: newNote,
        });
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getPosts = async (req, res) => {
    try {
        const userId = req.userId;
        const userRole = req.userRole;

        let query = {};
        
        if (userRole !== 'admin') {
            query.user = userId;
        }

        const notes = await Note.find(query)
            .populate('user', 'name email role')
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Notes retrieved successfully',
            count: notes.length,
            notes,
        });
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const userRole = req.userRole;

        const note = await Note.findById(id).populate('user', 'name email role');

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Check authorization - user can view their own note or admin can view any
        if (note.user._id.toString() !== userId && userRole !== 'admin') {
            return res.status(403).json({ message: 'Access denied. You can only view your own notes' });
        }

        res.status(200).json({
            message: 'Note retrieved successfully',
            note,
        });
    } catch (error) {
        console.error('Error fetching note:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// UPDATE - Update a note
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, status } = req.body;
        const userId = req.userId;
        const userRole = req.userRole;

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Check authorization - user can update their own note or admin can update any
        if (note.user.toString() !== userId && userRole !== 'admin') {
            return res.status(403).json({ message: 'Access denied. You can only update your own notes' });
        }

        // Update fields if provided
        if (title) note.title = title;
        if (content) note.content = content;
        if (status) note.status = status;

        await note.save();

        res.status(200).json({
            message: 'Note updated successfully',
            note,
        });
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// DELETE - Delete a note
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const userRole = req.userRole;

        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Check authorization - user can delete their own note or admin can delete any
        if (note.user.toString() !== userId && userRole !== 'admin') {
            return res.status(403).json({ message: 'Access denied. You can only delete your own notes' });
        }

        await Note.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Note deleted successfully',
            noteId: id,
        });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
