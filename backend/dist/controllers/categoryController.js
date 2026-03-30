"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.getCategories = exports.createCategory = void 0;
const Category_1 = __importDefault(require("../models/Category"));
// CREATE CATEGORY
const createCategory = async (req, res) => {
    try {
        const { displayName } = req.body;
        if (!displayName) {
            return res.status(400).json({ message: "displayName is required" });
        }
        // generate slug
        const slug = displayName
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, "")
            .trim()
            .replace(/\s+/g, "-");
        // check duplicate (same user)
        const existing = await Category_1.default.findOne({
            userId: req.userId,
            slug
        });
        if (existing) {
            return res.status(400).json({ message: "Category already exists" });
        }
        // create category
        const category = await Category_1.default.create({
            userId: req.userId,
            slug,
            displayName
        });
        return res.status(201).json(category);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.createCategory = createCategory;
const getCategories = async (req, res) => {
    try {
        const categories = await Category_1.default.find({ userId: req.userId });
        res.status(200).json(categories);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getCategories = getCategories;
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        // 🔴 MOCK MODE (since DB is down)
        if (!id) {
            return res.status(400).json({ message: "Category id required" });
        }
        return res.status(200).json({
            message: "Category deleted successfully (mock)",
            id
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.deleteCategory = deleteCategory;
/*
1. Take displayName from request
2. Generate slug
3. Check duplicate (userId + slug)
4. Save category
5. Return response
*/ 
//# sourceMappingURL=categoryController.js.map