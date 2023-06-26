"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const Order_1 = __importDefault(require("../controllers/Order"));
router.get("/", Order_1.default.fetch); ///orders?limit=10&skip=0
router.get("/:id", Order_1.default.detail);
router.post("/", Order_1.default.create);
router.delete("/:id", Order_1.default.delete);
router.delete("/cancel/:id", Order_1.default.cancel);
exports.default = router;
//# sourceMappingURL=Order.js.map