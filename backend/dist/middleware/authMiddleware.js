"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        // MOCK MODE (skip jwt.verify)
        if (token === "mock-token-123") {
            req.userId = "mock-user-id";
            return next();
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.default = authMiddleware;
/*
1. Reads Authorization header
2. Extracts token
3. Verifies JWT
4. Adds userId to request
5. Allows request to continue



In Express.js:
    A request doesn’t go directly to your controller.
    It flows like this:
        Request → Middleware → Middleware → Controller → Response
*/ 
//# sourceMappingURL=authMiddleware.js.map