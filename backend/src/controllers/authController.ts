import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { registerSchema, loginSchema } from "../validations/authValidation";

// REGISTER
export const register = async (req: Request, res: Response) => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ message: result.error.issues[0].message });
    }

    const { username, email, password } = result.data;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      username,
      email,
      passwordHash: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully",
      token: jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      ),
      userId: user._id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error:` });
  }
};


// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error.issues[0].message
      });
    }

    const { email, password } = result.data;

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Server error:` });
  }
};