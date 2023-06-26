"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const Payment_1 = __importDefault(require("../controllers/Payment"));
router.get('/', Payment_1.default.fetch); ///payments?limit=10&skip=0
router.get('/:id', Payment_1.default.detail);
router.post('/', Payment_1.default.create);
router.put('/:id', Payment_1.default.update);
router.delete('/:id', Payment_1.default.delete);
exports.default = router;
//# sourceMappingURL=Payment.js.map