"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/');
router.get('/:id');
router.put('/:id');
router.delete('/:id');
exports.default = router;
//# sourceMappingURL=users.route.js.map