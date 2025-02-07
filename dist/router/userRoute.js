"use strict";
// import { Router } from 'express';
// import { userControllers} from '../controller/index';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const router = Router();
// router.route('/send-otp').post (userControllers.sendOtpController);
// router.route('/verify-otp').post (userControllers.verifyOtpController);
// export default router;
const express_1 = __importDefault(require("express"));
const index_1 = require("../controller/index");
const router = express_1.default.Router();
// Register route
router.post('/register', index_1.userControllers.register);
// Login route
router.post('/login', index_1.userControllers.login);
exports.default = router;
//# sourceMappingURL=userRoute.js.map