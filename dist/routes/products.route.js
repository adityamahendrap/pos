"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const products_controller_1 = __importDefault(require("../controllers/products.controller"));
router.get('/', products_controller_1.default.fetch); ///products?limit=10&skip=0
router.get('/:id', products_controller_1.default.detail);
router.post('/', products_controller_1.default.create);
router.put('/:id', products_controller_1.default.update);
router.delete('/:id', products_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=products.route.js.map