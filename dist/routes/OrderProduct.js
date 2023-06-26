"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const OrderProduct_1 = __importDefault(require("../controllers/OrderProduct"));
router.get("/", OrderProduct_1.default.fetch); ///orders?limit=10&skip=0
router.get("/:id", OrderProduct_1.default.detail);
router.post("/", OrderProduct_1.default.create);
router.delete("/:id", OrderProduct_1.default.delete);
exports.default = router;
//# sourceMappingURL=OrderProduct.js.map