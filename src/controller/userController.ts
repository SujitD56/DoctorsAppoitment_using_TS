// user.controller.ts
import e, { Request, Response, NextFunction } from 'express';
import { userService } from "../services/index";  // Assuming userService handles the OTP sending and other user-related operations
import { errorResponse, successResponse } from '../utils/response';  // Utility functions for error and success responses
// import { sendOTP } from '../services/OtpService';  // Assuming sendOTP is a service function that handles the OTP sending logic
import { userServices } from '../services/userService';


// export const userSignUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     const { firstName, lastName, email, password, phone, verifyMode } = req.body;

//     if (!firstName || !lastName || !email || !password || !phone || !verifyMode) {
//       errorResponse(res, null, "All fields are required.", 400);
//       return;
//     }

//     const userExists = await userService.checkUser({ $or: [{ 'phone.value': phone }, { 'email.value': email }] });
//     if (userExists) {
//       errorResponse(res, null, `${email} is already registered with another user.`, 408);
//       return;
//     }
//     const metaData = {
//       phone_number: phone,
//       email_id: email,
//       first_name: firstName,
//       last_name: lastName,
//     };
//     const filter = {
//       mode: verifyMode,  
//       attribute: verifyMode === 'phone' ? phone : email,
//       purpose: "registration",  
//     };
//     let OTP = await sendOTP(filter, metaData);
//     if (!OTP) {
//       errorResponse(res, null, 'OTP already sent.', 429);  // If OTP already sent
//       return;
//     }
//     successResponse(res, { OTP:OTP }, 'OTP sent successfully. Please verify.');
//   } catch (error: any) {
//     errorResponse(res, error.message, error.statusCode || 500);
//   }
// };


// export const userSignUp = async (req: Request, res: Response,next: NextFunction): Promise<void> => {
//   try {
//     const { firstName, lastName, email, password, phone} = req.body;

//     if (!firstName || !lastName || !email || !password || !phone ) {
//       errorResponse(res, null, "All fields are required.", 400);
//       return;
//     }

//     console.log("Encrypting user data...");
//     const encryptedFirstName = encryptData(firstName);
//     const encryptedLastName = encryptData(lastName);
//     const encryptedEmail = encryptData(email);
//     const encryptedPhone = encryptData(phone);
//     const encryptedpassword = encryptData(password);

//     console.log("Checking if the user already exists...");
//     const userExists = await userServices.checkUser({
//       $or: [
//         { "phone.encrypted": phone },
//         { "email.encrypted": email },
//         { "phone.iv": phone},
//         { "email.iv": email},
//       ],
//     });

//     if (userExists) {
//       console.error("User already exists:", userExists);
//       errorResponse(res, null, `${email} is already registered with another user.`, 408);
//       return;
//     }

//     console.log("User does not exist. Proceeding to registration...");

//     const newUser = {
//       firstName: encryptedFirstName,
//       lastName: encryptedLastName,
//       email: encryptedEmail,
//       phone: encryptedPhone,
//       password: encryptedpassword,
//     };

//     console.log("Creating new user...");
//     const createdUser = await userServices.createUser(newUser);

//     successResponse(res, createdUser, "User registered successfully.");
//   } catch (error: any) {
//     console.error("Error occurred during user sign-up:", error);
//     errorResponse(res, error.message, error.statusCode || 500);
//   }
// };


export const userSignUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // Ensure that all required fields are strings
    if (
      typeof firstName !== 'string' ||
      typeof lastName !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof phone !== 'string'
    ) {
      res.status(400).json({ message: 'All fields must be strings.' });
      return;
    }

    if (!firstName || !lastName || !email || !password || !phone) {
      res.status(400).json({ message: 'All fields are required.' });
      return;
    }

    const userExists = await userServices.checkUser({
      $or: [
        { "phone.encrypted": phone },
        { "email.encrypted": email },
      ],
    });

    if (userExists) {
      res.status(408).json({ message: `${email} is already registered with another user.` });
      return;
    }

    const newUser = { firstName, lastName, email, phone, password };

    const createdUser = await userServices.createUser(newUser);
    res.status(200).json({ message: 'User registered successfully.', data: createdUser });
  } catch (error: any) {
    // res.status(500).json({ message: 'Error occurred during user sign-up: ' + error.message });
    errorResponse(res, error.message, error.statusCode || 500);
  }
};

// Controller to fetch a user's profile by their ID
export const getUserProfilebyid = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const user = await userServices.getUserById(userId);
    console.log("user", user);
    
  
    if (!user) {
      res.status(404).send('User not found');
      return;
    } 
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send('Error retrieving user profile: ' + (err as Error).message);
  }
};


export const getUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const filter = req.query.filter ? JSON.parse(req.query.filter as string) : {};
    const skip = req.query.skip ? parseInt(req.query.skip as string, 10) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
    const decrypt = req.query.decrypt === "true";
    const chunkSize = req.query.chunkSize ? parseInt(req.query.chunkSize as string, 10) : 10;
    const search = req.query.search?.toString().trim() || "";

    const users = await userService.getUsersService(filter, { skip, limit, chunkSize }, true, search)
    

    res.status(200).json({
      success: true,
      message: "Users fetched successfully.",
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error retrieving user profiles",
      error: error.message,
    });
  }
};


// Controller to update a user's profile
// export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const userId = req.params.userId;  // Get userId from request params
//     const updateData = req.body;  // Get update data from request body
//     const updatedUser = await userServices.updateUserProfile(userId, updateData);

//     if (!updatedUser) {
//       res.status(404).send('User not found');
//       return;
//     }

//     res.status(200).json(updatedUser);
//   } catch (err) {
//     res.status(500).send('Error updating user profile: ' + (err as Error).message);
//   }
// };

export const verifyOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
  try{
    // const {}
  }catch (error: any){
    errorResponse(res,error.message, error.statusCode || 500)
  }
}

