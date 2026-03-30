import express from "express";
import { createLink, getLinksByCategory, deleteLink } from "../controllers/linkController";
import protect from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, createLink);
router.delete("/:id", protect, deleteLink);
router.get("/:categoryId", protect, getLinksByCategory);

export default router;