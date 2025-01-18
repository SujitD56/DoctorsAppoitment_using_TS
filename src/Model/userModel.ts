// import mongoose, { Schema, Document } from "mongoose";

// interface UserDocument extends Document {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   phone: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const userSchema = new Schema<UserDocument>(
//   {
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     phone: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// export const userModel = mongoose.model<UserDocument>("Users", userSchema);

import mongoose, { Schema, Document } from 'mongoose';
import { decryptData } from '../Helpers/encrypt';

// Define the user schema
const userSchema = new Schema(
  {
    firstName: {
      encrypted: { type: String, required: true },
      iv: { type: String, required: true },
    },
    lastName: {
      encrypted: { type: String, required: true },
      iv: { type: String, required: true },
    },
    email: {
      encrypted: { type: String, required: true },
      iv: { type: String, required: true },
    },
    phone: {
      encrypted: { type: String, required: true },
      iv: { type: String, required: true },
    },
    password: {
      encrypted: { type: String, required: true },
      iv: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

// Add a method to compare encrypted password (for login functionality)
userSchema.methods.isPasswordMatch = function (password: string): boolean {
  const decryptedPassword = decryptData(this.password.encrypted, this.password.iv);
  return decryptedPassword === password;
};

// Export the model
export const userModel = mongoose.model<User>('Users', userSchema);
// export default userModel;

interface User extends Document {
  firstName: { encrypted: string; iv: string };
  lastName: { encrypted: string; iv: string };
  email: { encrypted: string; iv: string };
  phone: { encrypted: string; iv: string };
  password: { encrypted: string; iv: string };
  isPasswordMatch(password: string): boolean;
}

