"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
// REGISTER
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // check if user exists
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // hash password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        // create user
        const user = await User_1.default.create({
            username,
            email,
            passwordHash: hashedPassword
        });
        res.status(201).json({
            message: "User registered successfully",
            userId: user._id
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.register = register;
// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Skip DB completely
        return res.json({
            message: "Login successful (mock)",
            token: "mock-token-123",
        });
        // find user
        /*const user = await User.findOne({ email });
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
        });*/
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map