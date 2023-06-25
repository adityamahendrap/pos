"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = (0, express_1.Router)();
router.post('/login', auth_controller_1.default.login);
router.post('/register', auth_controller_1.default.register);
router.post('/verify-token', auth_controller_1.default.verifyToken);
router.get('/verify-email/:id', auth_controller_1.default.verifyEmail);
router.put('/change-password', auth_controller_1.default.changePassword);
router.put('/forgot-password', auth_controller_1.default.forgotPassword);
exports.default = router;
//# sourceMappingURL=auth.route.js.map