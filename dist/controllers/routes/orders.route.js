"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/"); ///orders?limit=10&skip=0
router.get("/:id");
router.post("/");
exports.default = router;
//# sourceMappingURL=orders.route.js.map