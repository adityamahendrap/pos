"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const User_1 = __importDefault(require("../controllers/User"));
router.get('/', User_1.default.fetch);
router.get('/:id', User_1.default.detail);
router.put('/:id', User_1.default.update);
router.delete('/:id', User_1.default.delete);
exports.default = router;
//# sourceMappingURL=User.js.map