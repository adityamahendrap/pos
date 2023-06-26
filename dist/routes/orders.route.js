"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const orders_controller_1 = __importDefault(require("../controllers/orders.controller"));
router.get("/", orders_controller_1.default.fetch); ///orders?limit=10&skip=0
router.get("/:id", orders_controller_1.default.detail);
router.post("/", orders_controller_1.default.create);
router.delete("/:id", orders_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=orders.route.js.map