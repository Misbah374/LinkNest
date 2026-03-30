import { Request, Response } from "express";
import Link from "../models/Link";
import Category from "../models/Category";
import { linkSchema } from "../validations/linkValidation";

interface AuthRequest extends Request {
  userId?: string;
}

export const createLink = async (req: AuthRequest, res: Response) => {
  try {
    const result = linkSchema.safeParse(req.body);

    if(!result.success){
      return res.status(400).json({ success: false, message: result.error.issues[0].message });
    }

    const { categoryId, name, originalURL } = result.data;

    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Check category belongs to user
    const category = await Category.findOne({
      _id: categoryId,
      userId: req.userId
    });

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    const shortCode = Math.random().toString(36).slice(2, 8);

    // save link
    const link = await Link.create({
      userId: req.userId,
      categoryId,
      name,
      originalURL,
      shortCode
    });

    return res.status(201).json({
      success: true,
      message: "Link created successfully",
      data: link
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Server error` });
  }
};

export const getLinksByCategory = async (req: AuthRequest, res: Response) => {
  try{
    const { categoryId } = req.params;
    if (!req.userId) {
      return res.status(401).json({success: false, message: "Unauthorized" });
    }
    const links = await Link.find({
      userId: req.userId,
      categoryId
    });

    console.log("PARAM categoryId:", req.params.categoryId);
    console.log("TYPE:", typeof req.params.categoryId);
    const allLinks = await Link.find();
    console.log("ALL LINKS:", allLinks);

    res.status(200).json({ success: true, message: "Links fetched successfully", data: links });
  }catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Server error` });
  }
}

export const deleteLink = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const link = await Link.findOneAndDelete({
      _id: id,
      userId: req.userId
    });

    if (!link) {
      return res.status(404).json({ success: false, message: "Link not found" });
    }

    return res.status(200).json({ success: true, message: "Link deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Server error` });
  }
};

export const redirectLink = async (req: Request, res: Response) => {
  try {
    const {shortcode} = req.params;

    const link = await Link.findOne({ shortCode: shortcode });

    if(!link){
      return res.status(404).json({ success: false, message: "Link not found" });
    }

    // increment click count
    link.clickCount += 1;
    await link.save();

    // redirect
    return res.redirect(link.originalURL);

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: `Server error` });
  }
};