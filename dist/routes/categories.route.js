"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controller_1 = __importDefault(require("../controllers/categories.controller"));
const router = (0, express_1.Router)();
router.get('/', categories_controller_1.default.fetch); ///categories?limit=10&skip=0
router.get('/:id', categories_controller_1.default.detail);
router.post('/', categories_controller_1.default.create);
router.put('/:id', categories_controller_1.default.update);
router.delete('/:id', categories_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=categories.route.js.map