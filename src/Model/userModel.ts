import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the User document
export interface IUser extends Document {
  phone: string; // User's phone number
  otpSessionId?: string; // OTP session ID from the OTP service
  otpMethod?: 'sms' | 'whatsapp'; // Method used to send OTP
  otpVerified: boolean; // Indicates if OTP is verified
  createdAt: Date; // Timestamp for user creation
  updatedAt: Date; // Timestamp for last update
}

// Define the User schema
const UserSchema: Schema<IUser> = new Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true, // Ensures unique phone numbers
      match: /^[0-9]{10}$/, // Validates 10-digit phone numbers
    },
    otpSessionId: {
      type: String,
      required: false, // Optional, set during OTP generation
    },
    otpMethod: {
      type: String,
      enum: ['sms', 'whatsapp'], // Allowed OTP methods
      required: false,
    },
    otpVerified: {
      type: Boolean,
      default: false, // Default to not verified
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create the User model
const User: Model<IUser> = mongoose.model<IUser>('Users', UserSchema);

export { User};
