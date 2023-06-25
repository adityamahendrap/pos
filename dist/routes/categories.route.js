"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/'); ///categories?limit=10&skip=0
router.get('/:id');
router.post('/');
router.put('/:id');
router.delete('/:id');
exports.default = router;
//# sourceMappingURL=categories.route.js.map