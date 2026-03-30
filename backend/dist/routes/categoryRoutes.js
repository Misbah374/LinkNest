"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const categoryController_2 = require("../controllers/categoryController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.delete('/:id', authMiddleware_1.default, categoryController_2.deleteCategory);
router.post('/', authMiddleware_1.default, categoryController_1.createCategory);
router.get('/', authMiddleware_1.default, categoryController_1.getCategories);
exports.default = router;
//# sourceMappingURL=categoryRoutes.js.map