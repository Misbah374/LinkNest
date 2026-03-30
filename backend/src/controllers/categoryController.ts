import { Response, Request } from "express";
import Category from "../models/Category";
import Link from "../models/Link";
import {categorySchema} from "../validations/categoryValidation";

interface AuthRequest extends Request {
  userId?: string;
}

// CREATE CATEGORY
export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    const result = categorySchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues[0].message
      });
    }

    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const { displayName } = result.data;

    // generate slug
    const slug = displayName
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    // check duplicate (same user)
    const existing = await Category.findOne({
      userId: req.userId,
      slug
    });

    if (existing) {
      return res.status(400).json({success: false ,message: "Category already exists" });
    }

    // create category
    const category = await Category.create({
      userId: req.userId,
      slug,
      displayName
    });

    return res.status(201).json({success: true, message: "Category created successfully", data: category});

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getCategories = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const categories = await Category.find({ userId: req.userId });
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    if(!id){
      return res.status(400).json({ message: "Category ID is required" });
    }

    const category = await Category.findOne({
      _id: id,
      userId: req.userId
    })

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Delete all links inside this category (important)
    await Link.deleteMany({ categoryId: id });

    // Delete category
    await Category.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Category deleted successfully",
      id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error` });
  }
};

/*
1. Take displayName from request
2. Generate slug
3. Check duplicate (userId + slug)
4. Save category
5. Return response
*/