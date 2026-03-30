"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLink = void 0;
const createLink = async (req, res) => {
    try {
        const { categoryId, name, originalURL } = req.body;
        if (!req.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!categoryId || !name || !originalURL) {
            return res.status(400).json({ message: "All fields required" });
        }
        if (!originalURL.startsWith("http")) {
            return res.status(400).json({ message: "Invalid URL" });
        }
        const shortCode = Math.random().toString(36).slice(2, 8);
        return res.status(201).json({
            message: "Link created (mock)",
            data: {
                _id: "mock-link-id",
                userId: req.userId,
                categoryId,
                name,
                originalURL,
                shortCode,
                clickCount: 0
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.createLink = createLink;
//# sourceMappingURL=linkController.js.map