import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.js";
import { createPost, getPosts, getPostById, updatePost, deletePost } from "../../controllers/note.js";

const noteRoute = Router();

noteRoute.get('/health-check', (req, res) => {
    console.log('Note route health check accessed');
    res.status(200).send('Note Route OK');
});

noteRoute.post('/', authMiddleware, createPost);
noteRoute.get('/', authMiddleware, getPosts);
noteRoute.get('/:id', authMiddleware, getPostById);
noteRoute.put('/:id', authMiddleware, updatePost);
noteRoute.delete('/:id', authMiddleware, deletePost);

export default noteRoute;