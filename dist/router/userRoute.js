"use strict";
// import { Router } from 'express';
// import { userControllers} from '../controller/index';
Object.defineProperty(exports, "__esModule", { value: true });
// const router = Router();
// router.route('/send-otp').post (userControllers.sendOtpController);
// router.route('/verify-otp').post (userControllers.verifyOtpController);
// export default router;
const express_1 = require("express");
const index_1 = require("../controller/index");
const router = (0, express_1.Router)();
router.post('/register', index_1.userControllers.register);
router.post('/login', index_1.userControllers.login);
/**
 * @swagger
 * tags:
 *   - name: "User"
 *     description: "Operations related to users"
 */
/**
 * @swagger
 * /v1/users/register:
 *   post:
 *     tags:
 *       - "User"
 *     summary: "Request for signup"
 *     description: "Request for signup"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: "User registration successful"
 */
/**
 * @swagger
 * /v1/users/login:
 *   post:
 *     tags:
 *       - "User"
 *     summary: "User login"
 *     description: "User login with credentials"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: "User login successful"
 *       401:
 *         description: "Unauthorized"
 */
exports.default = router;
//# sourceMappingURL=userRoute.js.map