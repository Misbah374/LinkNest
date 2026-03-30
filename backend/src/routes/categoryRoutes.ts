import express from 'express';
import { createCategory, getCategories } from '../controllers/categoryController';
import {deleteCategory} from "../controllers/categoryController";
import protect from '../middleware/authMiddleware';

const router = express.Router();

router.delete('/:id', protect, deleteCategory);
router.post('/', protect, createCategory);
router.get('/', protect, getCategories);

export default router;