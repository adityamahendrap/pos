"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const Product_1 = __importDefault(require("../controllers/Product"));
router.get('/', Product_1.default.fetch); ///products?limit=10&skip=0
router.get('/:id', Product_1.default.detail);
router.post('/', Product_1.default.create);
router.put('/:id', Product_1.default.update);
router.delete('/:id', Product_1.default.delete);
exports.default = router;
//# sourceMappingURL=Product.js.map