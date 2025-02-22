import axios from 'axios';
import dotenv from 'dotenv';
import { User } from '../Model/index';

dotenv.config();

const TWO_FACTOR_API_KEY = process.env.TWO_FACTOR_KEY;
const TWO_FACTOR_BASE_URL = 'https://2factor.in/API/V1';

// Helper function for sending OTP (SMS or WhatsApp)
const sendOtpRequest = async (phone: string, method: 'SMS' | 'WHATSAPP'): Promise<string> => {
    
  try {
    const url = `${TWO_FACTOR_BASE_URL}/${TWO_FACTOR_API_KEY}/${method}/${phone}/AUTOGEN`;
    console.log("response", url);
    const response = await axios.get(url);

    
    

    if (response.data.Status !== 'Success') {
      throw new Error(response.data.Details || `Failed to send OTP via ${method}`);
    }

    return response.data.Details; // OTP session ID
  } catch (error: any) {
    throw new Error(`Error sending OTP via ${method}: ${error.message}`);
  }
};

// Service to send OTP
export const sendOtp = async (phone: string, method: 'sms' | 'whatsapp'): Promise<string> => {
  const otpMethod = method === 'sms' ? 'SMS' : 'WHATSAPP';
  const sessionId = await sendOtpRequest(phone, otpMethod);

  // Update or create the user record with OTP details
  await User.findOneAndUpdate(
    { phone },
    { otpSessionId: sessionId, otpMethod: method, otpVerified: false },
    { upsert: true, new: true }
  );

  return sessionId;
};

// Service to verify OTP
export const verifyUserOtp = async (phone: string, sessionId: string, otp: string): Promise<boolean> => {
  try {
    const url = `${TWO_FACTOR_BASE_URL}/${TWO_FACTOR_API_KEY}/SMS/VERIFY/${sessionId}/${otp}`;
    const response = await axios.get(url);
    console.log(url);
    

    if (response.data.Status !== 'Success') {
      return false;
    }

    // Update the user record to reflect OTP verification
    await User.findOneAndUpdate(
      { phone, otpSessionId: sessionId },
      { otpVerified: true },
      { new: true }
    );

    return true;
  } catch (error: any) {
    throw new Error(`Error verifying OTP: ${error.message}`);
  }
};
