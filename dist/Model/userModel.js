"use strict";
// import mongoose, { Schema, Document, Model } from 'mongoose';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserByEmail = void 0;
// // Interface for the User document
// export interface IUser extends Document {
//   phone: string; // User's phone number
//   otpSessionId?: string; // OTP session ID from the OTP service
//   otpMethod?: 'sms' | 'whatsapp'; // Method used to send OTP
//   otpVerified: boolean; // Indicates if OTP is verified
//   createdAt: Date; // Timestamp for user creation
//   updatedAt: Date; // Timestamp for last update
// }
// // Define the User schema
// const UserSchema: Schema<IUser> = new Schema(
//   {
//     phone: {
//       type: String,
//       required: true,
//       unique: true, // Ensures unique phone numbers
//       match: /^[0-9]{10}$/, // Validates 10-digit phone numbers
//     },
//     otpSessionId: {
//       type: String,
//       required: false, // Optional, set during OTP generation
//     },
//     otpMethod: {
//       type: String,
//       enum: ['sms', 'whatsapp'], // Allowed OTP methods
//       required: false,
//     },
//     otpVerified: {
//       type: Boolean,
//       default: false, // Default to not verified
//     },
//   },
//   {
//     timestamps: true, // Adds createdAt and updatedAt fields
//   }
// );
// // Create the User model
// const User: Model<IUser> = mongoose.model<IUser>('Users', UserSchema);
// export { User};
const pg_1 = __importDefault(require("../config/pg"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUserByEmail = async (email) => {
    const result = await pg_1.default.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows.length > 0 ? result.rows[0] : null;
};
exports.getUserByEmail = getUserByEmail;
const createUser = async (username, email, password) => {
    const hashedPassword = await bcrypt_1.default.hash(password, 10); // Hash the password
    const result = await pg_1.default.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, hashedPassword]);
    return result.rows[0];
};
exports.createUser = createUser;
//# sourceMappingURL=userModel.js.map