// import { Request, Response } from 'express';
// import { userService } from '../services/index';

// export const sendOtpController = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { phone, method } = req.body;

//     // Input validation
//     if (!phone || !['sms', 'whatsapp'].includes(method)) {
//       res.status(400).json({ error: 'Invalid input. Provide a valid phone number and method (sms/whatsapp).' });
//     }

//     // Send OTP using the specified method
//     const sessionId = await userService.sendOtp(phone, method);

//     res.status(200).json({ message: 'OTP sent successfully', sessionId });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const verifyOtpController = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { phone, sessionId, otp } = req.body;

//     // Input validation
//     if (!phone || !sessionId || !otp) {
//       res.status(400).json({ error: 'Invalid input. Provide phone, sessionId, and OTP.' });
//     }

//     // Verify OTP
//     const isVerified = await userService.verifyUserOtp(phone, sessionId, otp);

//     if (!isVerified) {
//       res.status(400).json({ error: 'Invalid OTP' });
//     }

//     res.status(200).json({ message: 'OTP verified successfully' });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

import { Request, Response } from 'express';
import { userService } from '../services/index';

export const register = async (req: Request, res: Response) => {

  const { username, email, password } = req.body;
    try {
    const newUser = await userService.registerUser(username, email, password);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { token } = await userService.loginUser(email, password);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

