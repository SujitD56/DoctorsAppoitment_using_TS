// import mongoose, { Schema, Document, Model } from 'mongoose';

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

import client from "../config/pg";
import bcrypt from "bcrypt";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: string;
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};

export const createUser = async (username: string, email: string, password: string): Promise<User> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const result = await client.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting user:", error);
    throw error;
  }
};

