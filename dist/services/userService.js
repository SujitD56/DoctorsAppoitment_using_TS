"use strict";
// import axios from 'axios';
// import dotenv from 'dotenv';
// import { User } from '../Model/index';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
// dotenv.config();
// const TWO_FACTOR_API_KEY = process.env.TWO_FACTOR_KEY;
// const TWO_FACTOR_BASE_URL = 'https://2factor.in/API/V1';
// // Helper function for sending OTP (SMS or WhatsApp)
// const sendOtpRequest = async (phone: string, method: 'SMS' | 'WHATSAPP'): Promise<string> => {
//   try {
//     const url = `${TWO_FACTOR_BASE_URL}/${TWO_FACTOR_API_KEY}/${method}/${phone}/AUTOGEN`;
//     console.log("response", url);
//     const response = await axios.get(url);
//     if (response.data.Status !== 'Success') {
//       throw new Error(response.data.Details || `Failed to send OTP via ${method}`);
//     }
//     return response.data.Details; // OTP session ID
//   } catch (error: any) {
//     throw new Error(`Error sending OTP via ${method}: ${error.message}`);
//   }
// };
// // Service to send OTP
// export const sendOtp = async (phone: string, method: 'sms' | 'whatsapp'): Promise<string> => {
//   const otpMethod = method === 'sms' ? 'SMS' : 'WHATSAPP';
//   const sessionId = await sendOtpRequest(phone, otpMethod);
//   // Update or create the user record with OTP details
//   await User.findOneAndUpdate(
//     { phone },
//     { otpSessionId: sessionId, otpMethod: method, otpVerified: false },
//     { upsert: true, new: true }
//   );
//   return sessionId;
// };
// // Service to verify OTP
// export const verifyUserOtp = async (phone: string, sessionId: string, otp: string): Promise<boolean> => {
//   try {
//     const url = `${TWO_FACTOR_BASE_URL}/${TWO_FACTOR_API_KEY}/SMS/VERIFY/${sessionId}/${otp}`;
//     const response = await axios.get(url);
//     console.log(url);
//     if (response.data.Status !== 'Success') {
//       return false;
//     }
//     // Update the user record to reflect OTP verification
//     await User.findOneAndUpdate(
//       { phone, otpSessionId: sessionId },
//       { otpVerified: true },
//       { new: true }
//     );
//     return true;
//   } catch (error: any) {
//     throw new Error(`Error verifying OTP: ${error.message}`);
//   }
// };
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../Model/userModel");
const JWT_SECRET = process.env.JWT_SECRET;
// Function for user registration
const registerUser = async (username, email, password) => {
    // Check if user already exists
    const existingUser = await (0, userModel_1.getUserByEmail)(email);
    if (existingUser) {
        throw new Error('User already exists');
    }
    // Create user
    const user = await (0, userModel_1.createUser)(username, email, password);
    return user;
};
exports.registerUser = registerUser;
// Function for user login
const loginUser = async (email, password) => {
    const user = await (0, userModel_1.getUserByEmail)(email);
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const isPasswordMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Invalid credentials');
    }
    // Generate JWT Token
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return { token };
};
exports.loginUser = loginUser;
//# sourceMappingURL=userService.js.map