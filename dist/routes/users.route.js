"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const users_controller_1 = __importDefault(require("../controllers/users.controller"));
router.get('/', users_controller_1.default.fetch);
router.get('/:id', users_controller_1.default.detail);
router.put('/:id', users_controller_1.default.update);
router.delete('/:id', users_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=users.route.js.map