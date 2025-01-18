import { Schema, model } from 'mongoose';

const otpSchema = new Schema({
  mode: { type: String, required: true },  // 'phone' or 'email'
  attribute: { type: String, required: true },  // Phone number or email
  code: { type: String, required: true },  // OTP code
  purpose: { type: String, required: true },  // 'registration', 'login', etc.
  meta_data: { type: Object, required: true },  // Additional metadata (name, email, etc.)
}, { timestamps: true });

export const otpModel = model('OTP', otpSchema);