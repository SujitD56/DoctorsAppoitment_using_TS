"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const index_1 = require("../controller/index");
router.route("/signup").post(index_1.doctorController.signup);
exports.default = router;
//# sourceMappingURL=doctroRoute.js.map